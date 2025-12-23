// FastFoodz - Authentication Module

class AuthService {
    constructor() {
        this.currentUser = null;
        this.authStateListeners = [];
    }

    // Initialize auth state listener
    init() {
        if (!window.firebaseApp.auth) {
            console.error('Firebase auth not initialized');
            return;
        }

        window.firebaseApp.auth.onAuthStateChanged((user) => {
            this.currentUser = user;
            this.notifyListeners(user);

            if (user) {
                console.log('✅ User signed in:', user.email);
                this.syncUserData(user);
            } else {
                console.log('👤 User signed out');
            }
        });
    }

    // Add auth state listener
    onAuthStateChanged(callback) {
        this.authStateListeners.push(callback);
    }

    // Notify all listeners of auth state change
    notifyListeners(user) {
        this.authStateListeners.forEach(callback => callback(user));
    }

    // Sign up with email and password
    async signUp(email, password, displayName) {
        try {
            const userCredential = await window.firebaseApp.auth
                .createUserWithEmailAndPassword(email, password);

            // Update profile with display name
            await userCredential.user.updateProfile({
                displayName: displayName
            });

            // Create user document in Firestore
            await this.createUserDocument(userCredential.user, { displayName });

            window.uiService.showToast('success', 'Welcome!', 'Account created successfully');
            return userCredential.user;
        } catch (error) {
            console.error('Sign up error:', error);
            window.uiService.showToast('error', 'Sign Up Failed', error.message);
            throw error;
        }
    }

    // Sign in with email and password
    async signIn(email, password) {
        try {
            const userCredential = await window.firebaseApp.auth
                .signInWithEmailAndPassword(email, password);

            window.uiService.showToast('success', 'Welcome back!', `Signed in as ${email}`);
            return userCredential.user;
        } catch (error) {
            console.error('Sign in error:', error);
            window.uiService.showToast('error', 'Sign In Failed', error.message);
            throw error;
        }
    }

    // Sign in with Google
    async signInWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const userCredential = await window.firebaseApp.auth.signInWithPopup(provider);

            await this.createUserDocument(userCredential.user);
            window.uiService.showToast('success', 'Welcome!', 'Signed in with Google');
            return userCredential.user;
        } catch (error) {
            console.error('Google sign in error:', error);
            window.uiService.showToast('error', 'Google Sign In Failed', error.message);
            throw error;
        }
    }

    // Sign out
    async signOut() {
        try {
            await window.firebaseApp.auth.signOut();
            window.uiService.showToast('info', 'Signed Out', 'Come back soon!');

            // Clear cart
            window.cartService.clearCart();

            // Redirect to home
            window.location.hash = '#home';
        } catch (error) {
            console.error('Sign out error:', error);
            window.uiService.showToast('error', 'Sign Out Failed', error.message);
            throw error;
        }
    }

    // Reset password
    async resetPassword(email) {
        try {
            await window.firebaseApp.auth.sendPasswordResetEmail(email);
            window.uiService.showToast('success', 'Email Sent', 'Check your inbox for password reset link');
        } catch (error) {
            console.error('Password reset error:', error);
            window.uiService.showToast('error', 'Reset Failed', error.message);
            throw error;
        }
    }

    // Create or update user document in Firestore
    async createUserDocument(user, additionalData = {}) {
        if (!user) return;

        const userRef = window.firebaseApp.db
            .collection(window.firebaseApp.Collections.USERS)
            .doc(user.uid);

        const snapshot = await userRef.get();

        if (!snapshot.exists) {
            const { email, displayName, photoURL } = user;
            const createdAt = firebase.firestore.FieldValue.serverTimestamp();

            try {
                await userRef.set({
                    email,
                    displayName: displayName || additionalData.displayName || 'Food Lover',
                    photoURL: photoURL || '',
                    createdAt,
                    addresses: [],
                    favorites: [],
                    ...additionalData
                });
                console.log('✅ User document created');
            } catch (error) {
                console.error('Error creating user document:', error);
            }
        }
    }

    // Sync user data from Firestore
    async syncUserData(user) {
        if (!user) return null;

        try {
            const userDoc = await window.firebaseApp.db
                .collection(window.firebaseApp.Collections.USERS)
                .doc(user.uid)
                .get();

            if (userDoc.exists) {
                return userDoc.data();
            }
        } catch (error) {
            console.error('Error syncing user data:', error);
        }
        return null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.currentUser;
    }

    // Get user data from Firestore
    async getUserData() {
        if (!this.currentUser) return null;

        try {
            const userDoc = await window.firebaseApp.db
                .collection(window.firebaseApp.Collections.USERS)
                .doc(this.currentUser.uid)
                .get();

            return userDoc.exists ? userDoc.data() : null;
        } catch (error) {
            console.error('Error getting user data:', error);
            return null;
        }
    }

    // Update user profile
    async updateProfile(data) {
        if (!this.currentUser) {
            throw new Error('No user signed in');
        }

        try {
            await window.firebaseApp.db
                .collection(window.firebaseApp.Collections.USERS)
                .doc(this.currentUser.uid)
                .update(data);

            window.uiService.showToast('success', 'Profile Updated', 'Your changes have been saved');
        } catch (error) {
            console.error('Error updating profile:', error);
            window.uiService.showToast('error', 'Update Failed', error.message);
            throw error;
        }
    }

    // Add address
    async addAddress(address) {
        if (!this.currentUser) {
            throw new Error('No user signed in');
        }

        try {
            await window.firebaseApp.db
                .collection(window.firebaseApp.Collections.USERS)
                .doc(this.currentUser.uid)
                .update({
                    addresses: firebase.firestore.FieldValue.arrayUnion(address)
                });

            window.uiService.showToast('success', 'Address Added', 'New delivery address saved');
        } catch (error) {
            console.error('Error adding address:', error);
            window.uiService.showToast('error', 'Failed to Add Address', error.message);
            throw error;
        }
    }

    // Toggle favorite restaurant
    async toggleFavorite(restaurantId) {
        if (!this.currentUser) {
            window.uiService.showToast('info', 'Sign In Required', 'Please sign in to save favorites');
            return;
        }

        try {
            const userData = await this.getUserData();
            const favorites = userData?.favorites || [];
            const isFavorite = favorites.includes(restaurantId);

            if (isFavorite) {
                await window.firebaseApp.db
                    .collection(window.firebaseApp.Collections.USERS)
                    .doc(this.currentUser.uid)
                    .update({
                        favorites: firebase.firestore.FieldValue.arrayRemove(restaurantId)
                    });
                window.uiService.showToast('info', 'Removed', 'Removed from favorites');
            } else {
                await window.firebaseApp.db
                    .collection(window.firebaseApp.Collections.USERS)
                    .doc(this.currentUser.uid)
                    .update({
                        favorites: firebase.firestore.FieldValue.arrayUnion(restaurantId)
                    });
                window.uiService.showToast('success', 'Added', 'Added to favorites');
            }

            return !isFavorite;
        } catch (error) {
            console.error('Error toggling favorite:', error);
            window.uiService.showToast('error', 'Failed', error.message);
            throw error;
        }
    }
}

// Create global instance
window.authService = new AuthService();
