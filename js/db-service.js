// FastFoodz - Database Service
// Handles all Firestore operations for restaurants, orders, cart, and users

class DatabaseService {
    constructor() {
        this.db = null;
        this.collections = {
            RESTAURANTS: 'restaurants',
            ORDERS: 'orders',
            USERS: 'users',
            CART: 'cart'
        };
        this.CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
    }

    // Initialize database connection
    initialize() {
        if (window.firebaseApp && window.firebaseApp.db) {
            this.db = window.firebaseApp.db;
            console.log('✅ Database service initialized');
            return true;
        } else {
            console.error('❌ Firebase not initialized');
            return false;
        }
    }

    // ==================== RESTAURANT OPERATIONS ====================

    /**
     * Get restaurants from Firestore or fetch from API if cache expired
     */
    async getRestaurants(lat, lng, radius = 5000) {
        try {
            // Check if we have cached restaurants
            const cacheKey = `${lat.toFixed(4)}_${lng.toFixed(4)}_${radius}`;
            const cacheDoc = await this.db.collection('cache').doc(cacheKey).get();

            if (cacheDoc.exists) {
                const cacheData = cacheDoc.data();
                const age = Date.now() - cacheData.timestamp;

                // If cache is fresh (< 24 hours), use it
                if (age < this.CACHE_DURATION) {
                    console.log('📦 Using cached restaurant data from Firestore');
                    return cacheData.restaurants;
                }
            }

            // Cache expired or doesn't exist - fetch from API
            console.log('🔄 Fetching fresh restaurant data from API...');
            const response = await fetch(`http://localhost:3000/api/restaurants?lat=${lat}&lng=${lng}&radius=${radius}&limit=50`);

            if (!response.ok) {
                throw new Error(`API returned ${response.status}`);
            }

            const data = await response.json();

            if (data.success && data.restaurants) {
                // Store in cache
                await this.db.collection('cache').doc(cacheKey).set({
                    restaurants: data.restaurants,
                    timestamp: Date.now(),
                    location: { lat, lng, radius }
                });

                // Also store individual restaurants
                await this.syncRestaurantsToFirestore(data.restaurants);

                console.log(`✅ Cached ${data.restaurants.length} restaurants in Firestore`);
                return data.restaurants;
            }

            throw new Error('Invalid API response');

        } catch (error) {
            console.error('❌ Error getting restaurants:', error);

            // Try to get any cached data as fallback
            try {
                const snapshot = await this.db.collection(this.collections.RESTAURANTS)
                    .limit(50)
                    .get();

                if (!snapshot.empty) {
                    console.log('⚠️ Using old cached data as fallback');
                    return snapshot.docs.map(doc => doc.data());
                }
            } catch (fallbackError) {
                console.error('❌ Fallback also failed:', fallbackError);
            }

            throw error;
        }
    }

    /**
     * Sync restaurants to Firestore for individual access
     */
    async syncRestaurantsToFirestore(restaurants) {
        const batch = this.db.batch();

        restaurants.forEach(restaurant => {
            const docRef = this.db.collection(this.collections.RESTAURANTS).doc(restaurant.id);
            batch.set(docRef, {
                ...restaurant,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        });

        await batch.commit();
        console.log(`✅ Synced ${restaurants.length} restaurants to Firestore`);
    }

    /**
     * Get single restaurant by ID
     */
    async getRestaurantById(restaurantId) {
        try {
            const doc = await this.db.collection(this.collections.RESTAURANTS).doc(restaurantId).get();

            if (doc.exists) {
                return doc.data();
            }

            return null;
        } catch (error) {
            console.error('❌ Error getting restaurant:', error);
            return null;
        }
    }

    // ==================== ORDER OPERATIONS ====================

    /**
     * Create a new order
     */
    async createOrder(orderData) {
        try {
            const order = {
                ...orderData,
                status: 'pending',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await this.db.collection(this.collections.ORDERS).add(order);

            console.log('✅ Order created:', docRef.id);

            return {
                id: docRef.id,
                ...order
            };
        } catch (error) {
            console.error('❌ Error creating order:', error);
            throw error;
        }
    }

    /**
     * Get user's orders
     */
    async getUserOrders(userId) {
        try {
            const snapshot = await this.db.collection(this.collections.ORDERS)
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('❌ Error getting orders:', error);
            return [];
        }
    }

    /**
     * Update order status
     */
    async updateOrderStatus(orderId, status) {
        try {
            await this.db.collection(this.collections.ORDERS).doc(orderId).update({
                status,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log(`✅ Order ${orderId} status updated to ${status}`);
        } catch (error) {
            console.error('❌ Error updating order:', error);
            throw error;
        }
    }

    /**
     * Listen to order updates in real-time
     */
    listenToOrder(orderId, callback) {
        return this.db.collection(this.collections.ORDERS)
            .doc(orderId)
            .onSnapshot(doc => {
                if (doc.exists) {
                    callback({
                        id: doc.id,
                        ...doc.data()
                    });
                }
            });
    }

    // ==================== CART OPERATIONS ====================

    /**
     * Save cart to Firestore
     */
    async saveCart(userId, cartItems) {
        try {
            await this.db.collection(this.collections.CART).doc(userId).set({
                items: cartItems,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log('✅ Cart saved to Firestore');
        } catch (error) {
            console.error('❌ Error saving cart:', error);
        }
    }

    /**
     * Load cart from Firestore
     */
    async loadCart(userId) {
        try {
            const doc = await this.db.collection(this.collections.CART).doc(userId).get();

            if (doc.exists) {
                console.log('✅ Cart loaded from Firestore');
                return doc.data().items || [];
            }

            return [];
        } catch (error) {
            console.error('❌ Error loading cart:', error);
            return [];
        }
    }

    /**
     * Clear cart
     */
    async clearCart(userId) {
        try {
            await this.db.collection(this.collections.CART).doc(userId).delete();
            console.log('✅ Cart cleared from Firestore');
        } catch (error) {
            console.error('❌ Error clearing cart:', error);
        }
    }

    // ==================== USER OPERATIONS ====================

    /**
     * Create or update user profile
     */
    async saveUserProfile(userId, userData) {
        try {
            await this.db.collection(this.collections.USERS).doc(userId).set({
                ...userData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            console.log('✅ User profile saved');
        } catch (error) {
            console.error('❌ Error saving user profile:', error);
            throw error;
        }
    }

    /**
     * Get user profile
     */
    async getUserProfile(userId) {
        try {
            const doc = await this.db.collection(this.collections.USERS).doc(userId).get();

            if (doc.exists) {
                return doc.data();
            }

            return null;
        } catch (error) {
            console.error('❌ Error getting user profile:', error);
            return null;
        }
    }

    /**
     * Add delivery address to user profile
     */
    async addDeliveryAddress(userId, address) {
        try {
            await this.db.collection(this.collections.USERS).doc(userId).update({
                addresses: firebase.firestore.FieldValue.arrayUnion(address),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log('✅ Delivery address added');
        } catch (error) {
            console.error('❌ Error adding address:', error);
            throw error;
        }
    }
}

// Create global instance
window.dbService = new DatabaseService();
