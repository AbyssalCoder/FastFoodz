# 🍔 FastFoodz - Food Delivery App

A modern, real-time food delivery application built with vanilla JavaScript, Firebase, and OpenStreetMap.

![FastFoodz](assets/logo.png)

## ✨ Features

- 🗺️ **Real Restaurant Data** - Fetches actual restaurants from OpenStreetMap based on your location
- 🖼️ **Real Food Images** - High-quality food images from Unsplash
- 🔥 **Firebase Integration** - Real-time database, authentication, and cloud storage
- 📦 **Order Management** - Place orders, track status, view history
- 🛒 **Smart Cart** - Persistent cart synced across devices
- 📍 **Location-Based** - Shows restaurants within 5km radius
- 🌙 **Dark Mode** - Beautiful dark-themed UI
- 📱 **Responsive** - Works on desktop, tablet, and mobile

## 🚀 Live Demo

[View Live Demo](#) *(Add your GitHub Pages URL here)*

## 📁 Files to Upload to GitHub

### Essential Frontend Files (Required):

```
FastFoodz/
├── index.html                 # Main HTML file
├── package.json              # Node.js dependencies
├── server.js                 # Backend server (OpenStreetMap proxy)
├── .gitignore               # Git ignore file
├── README.md                # This file
│
├── css/                     # Stylesheets
│   ├── style.css           # Main styles
│   ├── components.css      # Component styles
│   └── responsive.css      # Mobile responsive styles
│
├── js/                      # JavaScript files
│   ├── app.js              # Main application
│   ├── firebase-config.js  # Firebase configuration
│   ├── db-service.js       # Database operations
│   ├── auth.js             # Authentication
│   ├── cart.js             # Shopping cart
│   ├── restaurants.js      # Restaurant management
│   ├── orders.js           # Order management
│   ├── location.js         # Geolocation services
│   ├── yelp-service.js     # API service
│   └── ui.js               # UI utilities
│
└── assets/                  # Static assets
    └── logo.png            # App logo
```

### Files to EXCLUDE (already in .gitignore):
- `node_modules/` - Install with `npm install`
- `.env` - Environment variables (create your own)
- `test-api.js` - Testing file
- `.gemini/` - Development artifacts

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/FastFoodz.git
cd FastFoodz
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- `express` - Backend server
- `cors` - Cross-origin requests
- `node-fetch` - API requests

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Firestore Database**, **Authentication**, and **Storage**
4. Get your Firebase config from Project Settings
5. Update `js/firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Run Locally

**Start the backend server:**
```bash
node server.js
```
Server runs on `http://localhost:3000`

**Start the frontend (in a new terminal):**
```bash
python -m http.server 8000
```
Frontend runs on `http://localhost:8000`

### 5. Deploy to GitHub Pages

**Option A: Frontend Only (Static Hosting)**

1. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save

3. **Important**: For GitHub Pages, you need to deploy the backend separately (see below)

**Option B: Full Stack Deployment**

Deploy backend to:
- **Heroku** (Free tier available)
- **Railway** (Easy deployment)
- **Render** (Free tier)
- **Vercel** (Serverless functions)

Update API endpoint in `js/yelp-service.js`:
```javascript
const backendUrl = `https://your-backend.herokuapp.com/api/restaurants?lat=${latitude}&lng=${longitude}`;
```

## 🖼️ How Images Work

Images are loaded from **Unsplash** using direct URLs:
- Restaurant images: Based on cuisine type (biryani, pizza, etc.)
- Menu item images: Based on dish name
- **No image uploads needed** - All images are fetched from Unsplash CDN

Image mapping in `server.js`:
```javascript
const foodImages = {
    'biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
    'pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    // ... more mappings
};
```

## 📊 Database Structure

### Firestore Collections:

**restaurants/**
- Cached restaurant data from OpenStreetMap
- Auto-refreshes every 24 hours

**orders/**
- User orders with status tracking
- Real-time updates

**cart/**
- User shopping carts
- Synced across devices

**users/**
- User profiles
- Delivery addresses

## 🔧 Technologies Used

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Backend**: Node.js, Express
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Maps**: OpenStreetMap Overpass API
- **Images**: Unsplash
- **Hosting**: GitHub Pages (Frontend), Heroku/Railway (Backend)

## 📝 Environment Variables

Create a `.env` file for sensitive data (optional):

```env
FIREBASE_API_KEY=your_api_key
PORT=3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Restaurant data from [OpenStreetMap](https://www.openstreetmap.org/)
- Food images from [Unsplash](https://unsplash.com/)
- Icons from Unicode Emoji

---

Made with ❤️ for food lovers
