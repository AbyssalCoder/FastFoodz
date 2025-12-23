// FastFoodz - Firebase Configuration
// IMPORTANT: Replace these values with your actual Firebase project credentials

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
let app, auth, db, storage;

function initializeFirebase() {
  try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();
    
    console.log('✅ Firebase initialized successfully');
    
    // Enable offline persistence
    db.enablePersistence()
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code === 'unimplemented') {
          console.warn('The current browser does not support persistence.');
        }
      });
    
    return true;
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    return false;
  }
}

// Firestore Collections
const Collections = {
  USERS: 'users',
  RESTAURANTS: 'restaurants',
  ORDERS: 'orders',
  REVIEWS: 'reviews'
};

// Export for use in other modules
window.firebaseApp = {
  app,
  auth,
  db,
  storage,
  Collections,
  initialize: initializeFirebase
};
