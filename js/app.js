// FastFoodz - Main Application

class FastFoodzApp {
  constructor() {
    this.currentView = 'home';
    this.currentRestaurant = null;
    this.isCartOpen = false;
  }

  // Initialize the application
  async init() {
    console.log('🚀 Initializing FastFoodz...');

    // Initialize Firebase
    if (!window.firebaseApp.initialize()) {
      console.error('Failed to initialize Firebase');
      this.showFirebaseError();
      return;
    }

    // Initialize services
    if (window.dbService) {
      window.dbService.initialize();
    }
    window.uiService.init();
    window.authService.init();

    // Get user location
    window.uiService.showLoading('Getting your location...');
    await window.locationService.getUserLocation();

    // Load restaurants
    await window.restaurantService.loadRestaurants();
    window.uiService.hideLoading();

    // Setup routing
    this.setupRouting();

    // Setup cart listener
    window.cartService.onChange(() => this.updateCartUI());

    // Setup auth listener
    window.authService.onAuthStateChanged((user) => this.updateAuthUI(user));

    // Initial render
    this.render();

    console.log('✅ FastFoodz initialized successfully');
  }

  // Show Firebase error
  showFirebaseError() {
    document.getElementById('app').innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <h1 style="color: var(--error); margin-bottom: 1rem;">⚠️ Configuration Required</h1>
        <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto;">
          Please configure your Firebase credentials in <code>js/firebase-config.js</code> to use this application.
        </p>
        <button class="btn btn-primary" style="margin-top: 2rem;" onclick="window.restaurantService.loadFromSeedData(); window.app.render();">
          Continue with Demo Data
        </button>
      </div>
    `;
  }

  // Setup routing
  setupRouting() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  // Handle route changes
  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const [view, id] = hash.split('/');

    this.currentView = view;

    if (view === 'restaurant' && id) {
      this.currentRestaurant = window.restaurantService.getRestaurantById(id);
    }

    this.render();
  }

  // Main render function
  render() {
    const app = document.getElementById('app');

    switch (this.currentView) {
      case 'home':
        app.innerHTML = this.renderHome();
        this.attachHomeListeners();
        break;
      case 'restaurant':
        app.innerHTML = this.renderRestaurant();
        this.attachRestaurantListeners();
        break;
      case 'orders':
        this.renderOrders();
        break;
      case 'profile':
        this.renderProfile();
        break;
      default:
        app.innerHTML = this.renderHome();
        this.attachHomeListeners();
    }

    this.updateCartUI();
  }

  // Render home view
  renderHome() {
    const restaurants = window.restaurantService.getRestaurants();
    const cuisines = window.restaurantService.getAllCuisines();

    return `
      <div class="container">
        <section style="padding: 3rem 0; text-align: center;">
          <h1 style="margin-bottom: 1rem;">Delicious Food, Delivered Fast ⚡</h1>
          <p style="color: var(--text-secondary); font-size: 1.125rem; max-width: 600px; margin: 0 auto 2rem;">
            Order from ${restaurants.length}+ restaurants near you
          </p>
          
          <div style="max-width: 600px; margin: 0 auto;">
            <input 
              type="text" 
              class="input search-input" 
              id="search-input"
              placeholder="Search for restaurants or dishes..."
            >
          </div>
        </section>

        <section>
          <div class="filters-bar">
            <button class="filter-chip active" onclick="window.app.clearFilters()">All</button>
            <button class="filter-chip" onclick="window.app.filterVeg()">🌱 Pure Veg</button>
            <button class="filter-chip" onclick="window.app.filterRating(4.5)">⭐ 4.5+</button>
            <button class="filter-chip" onclick="window.app.filterDeliveryTime(30)">⚡ Fast Delivery</button>
            ${cuisines.slice(0, 8).map(cuisine => `
              <button class="filter-chip" onclick="window.app.filterCuisine('${cuisine}')">${cuisine}</button>
            `).join('')}
          </div>
        </section>

        <section>
          <h2>Restaurants Near You</h2>
          <div class="restaurant-grid" id="restaurant-grid">
            ${restaurants.map(restaurant => this.renderRestaurantCard(restaurant)).join('')}
          </div>
          
          ${restaurants.length === 0 ? `
            <div style="text-align: center; padding: 4rem 2rem; color: var(--text-muted);">
              <p style="font-size: 3rem; margin-bottom: 1rem;">🔍</p>
              <p>No restaurants found. Try adjusting your filters.</p>
            </div>
          ` : ''}
        </section>
      </div>
    `;
  }

  // Render restaurant card
  renderRestaurantCard(restaurant) {
    const distance = restaurant.distance || 0;

    return `
      <div class="restaurant-card" onclick="window.location.hash='restaurant/${restaurant.id}'">
        <div class="restaurant-card-image-wrapper">
          <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-card-image">
          <div class="restaurant-card-overlay"></div>
          <div class="restaurant-card-badges">
            ${restaurant.isVeg ? '<span class="badge badge-success">🌱 Veg</span>' : ''}
          </div>
        </div>
        <div class="restaurant-card-content">
          <div class="restaurant-card-header">
            <h3 class="restaurant-name">${restaurant.name}</h3>
            <div class="restaurant-rating">⭐ ${restaurant.rating}</div>
          </div>
          <p class="restaurant-cuisines">${restaurant.cuisines.join(', ')}</p>
          <div class="restaurant-meta">
            <span class="restaurant-meta-item">🕐 ${restaurant.deliveryTime}</span>
            <span class="restaurant-meta-item">💰 ₹${restaurant.priceForTwo} for two</span>
            <span class="restaurant-meta-item restaurant-distance">📍 ${window.locationService.formatDistance(distance)}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Render restaurant detail view
  renderRestaurant() {
    if (!this.currentRestaurant) {
      return '<div class="container"><p>Restaurant not found</p></div>';
    }

    const restaurant = this.currentRestaurant;
    const distance = restaurant.distance || 0;

    return `
      <div class="container" style="padding-top: 2rem;">
        <button class="btn btn-secondary btn-sm" onclick="window.history.back()" style="margin-bottom: 1rem;">
          ← Back
        </button>

        <div style="background: var(--bg-card); border-radius: var(--radius-xl); overflow: hidden; margin-bottom: 2rem;">
          <img src="${restaurant.image}" alt="${restaurant.name}" style="width: 100%; height: 300px; object-fit: cover;">
          <div style="padding: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
              <div>
                <h1 style="margin-bottom: 0.5rem;">${restaurant.name}</h1>
                <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">${restaurant.cuisines.join(', ')}</p>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                  <span class="badge badge-success">⭐ ${restaurant.rating}</span>
                  <span class="badge badge-info">🕐 ${restaurant.deliveryTime}</span>
                  <span class="badge badge-info">📍 ${window.locationService.formatDistance(distance)}</span>
                  <span class="badge badge-warning">💰 ₹${restaurant.priceForTwo} for two</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2>Menu</h2>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${restaurant.menu.map(item => this.renderFoodItem(item, restaurant)).join('')}
        </div>
      </div>
    `;
  }

  // Render food item
  renderFoodItem(item, restaurant) {
    const inCart = window.cartService.isInCart(item.id);
    const quantity = window.cartService.getItemQuantity(item.id);

    return `
      <div class="food-item-card">
        <div class="food-item-info">
          <div class="food-item-type ${item.type}"></div>
          <h4 class="food-item-name">${item.name}</h4>
          <p class="food-item-description">${item.description}</p>
          <div class="food-item-price">₹${item.price}</div>
        </div>
        <div class="food-item-image-wrapper">
          <img src="${item.image}" alt="${item.name}" class="food-item-image">
          ${inCart ? `
            <div class="food-item-quantity-control">
              <button class="food-item-quantity-btn" onclick="window.app.decreaseQuantity('${item.id}')">−</button>
              <span class="food-item-quantity">${quantity}</span>
              <button class="food-item-quantity-btn" onclick="window.app.increaseQuantity('${item.id}')">+</button>
            </div>
          ` : `
            <button class="food-item-add-btn" onclick="window.app.addToCart('${item.id}', '${restaurant.id}')">Add</button>
          `}
        </div>
      </div>
    `;
  }

  // Render orders view
  async renderOrders() {
    if (!window.authService.isAuthenticated()) {
      window.uiService.showAuthModal();
      window.location.hash = '#home';
      return;
    }

    window.uiService.showLoading('Loading your orders...');
    const orders = await window.orderService.getOrderHistory();
    window.uiService.hideLoading();

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="container" style="padding-top: 2rem;">
        <h1>Your Orders</h1>
        ${orders.length > 0 ? `
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem;">
            ${orders.map(order => this.renderOrderCard(order)).join('')}
          </div>
        ` : `
          <div style="text-align: center; padding: 4rem 2rem; color: var(--text-muted);">
            <p style="font-size: 3rem; margin-bottom: 1rem;">📦</p>
            <p>No orders yet. Start ordering delicious food!</p>
            <button class="btn btn-primary" onclick="window.location.hash='#home'" style="margin-top: 1rem;">
              Browse Restaurants
            </button>
          </div>
        `}
      </div>
    `;
  }

  // Render order card
  renderOrderCard(order) {
    const statusInfo = window.orderService.getStatusInfo(order.status);

    return `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
          <div>
            <h3 style="margin-bottom: 0.5rem;">${order.restaurantName}</h3>
            <p style="color: var(--text-muted); font-size: 0.875rem;">
              Order #${order.id.slice(0, 8)} • ${window.uiService.formatDate(order.createdAt)}
            </p>
          </div>
          <span class="badge badge-${statusInfo.color}">${statusInfo.icon} ${statusInfo.label}</span>
        </div>
        
        <div style="border-top: 1px solid var(--bg-glass); padding-top: 1rem; margin-top: 1rem;">
          <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">
            ${order.items.length} item${order.items.length > 1 ? 's' : ''}
          </p>
          <p style="font-size: 1.25rem; font-weight: 700;">
            Total: ${window.uiService.formatCurrency(order.total)}
          </p>
        </div>
        
        <button class="btn btn-outline btn-sm" onclick="window.orderService.reorder(${JSON.stringify(order).replace(/"/g, '&quot;')})" style="margin-top: 1rem;">
          🔄 Reorder
        </button>
      </div>
    `;
  }

  // Render profile view
  async renderProfile() {
    if (!window.authService.isAuthenticated()) {
      window.uiService.showAuthModal();
      window.location.hash = '#home';
      return;
    }

    const user = window.authService.getCurrentUser();
    const userData = await window.authService.getUserData();

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="container" style="padding-top: 2rem;">
        <h1>Profile</h1>
        <div class="card" style="margin-top: 2rem;">
          <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem;">
            <img src="${user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || user.email)}" 
                 alt="Profile" 
                 style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid var(--primary-purple);">
            <div>
              <h2 style="margin-bottom: 0.5rem;">${user.displayName || 'Food Lover'}</h2>
              <p style="color: var(--text-secondary);">${user.email}</p>
            </div>
          </div>
          
          <button class="btn btn-outline" onclick="window.authService.signOut()">
            Sign Out
          </button>
        </div>
      </div>
    `;
  }

  // Attach home listeners
  attachHomeListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', window.uiService.debounce((e) => {
        window.restaurantService.setSearch(e.target.value);
        this.updateRestaurantGrid();
      }, 300));
    }
  }

  // Attach restaurant listeners
  attachRestaurantListeners() {
    // Already handled via onclick attributes
  }

  // Update restaurant grid
  updateRestaurantGrid() {
    const grid = document.getElementById('restaurant-grid');
    if (grid) {
      const restaurants = window.restaurantService.getRestaurants();
      grid.innerHTML = restaurants.map(r => this.renderRestaurantCard(r)).join('');
    }
  }

  // Filter functions
  clearFilters() {
    window.restaurantService.clearFilters();
    this.updateRestaurantGrid();
    this.updateFilterButtons();
  }

  filterVeg() {
    window.restaurantService.setVegFilter(true);
    this.updateRestaurantGrid();
  }

  filterRating(rating) {
    window.restaurantService.setRatingFilter(rating);
    this.updateRestaurantGrid();
  }

  filterDeliveryTime(time) {
    window.restaurantService.setDeliveryTimeFilter(time);
    this.updateRestaurantGrid();
  }

  filterCuisine(cuisine) {
    window.restaurantService.setCuisineFilter(cuisine);
    this.updateRestaurantGrid();
  }

  updateFilterButtons() {
    document.querySelectorAll('.filter-chip').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector('.filter-chip').classList.add('active');
  }

  // Cart functions
  addToCart(itemId, restaurantId) {
    const restaurant = window.restaurantService.getRestaurantById(restaurantId);
    const item = restaurant.menu.find(i => i.id === itemId);

    if (window.cartService.addItem(item, restaurant)) {
      this.render();
    }
  }

  increaseQuantity(itemId) {
    window.cartService.increaseQuantity(itemId);
    this.render();
  }

  decreaseQuantity(itemId) {
    window.cartService.decreaseQuantity(itemId);
    this.render();
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    const cart = document.getElementById('cart-sidebar');
    if (cart) {
      cart.classList.toggle('open', this.isCartOpen);
    }
  }

  // Update cart UI
  updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const count = window.cartService.getItemCount();

    if (cartCount) {
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'flex' : 'none';
    }

    this.updateCartSidebar();
  }

  // Update cart sidebar
  updateCartSidebar() {
    const cartItems = document.getElementById('cart-items-list');
    const cartSummary = document.getElementById('cart-summary');

    if (!cartItems || !cartSummary) return;

    const summary = window.cartService.getSummary();

    if (summary.items.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛒</div>
          <p>Your cart is empty</p>
        </div>
      `;
      cartSummary.innerHTML = '';
      return;
    }

    cartItems.innerHTML = summary.items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price} × ${item.quantity}</div>
          <div class="cart-item-controls">
            <button class="btn btn-sm btn-secondary" onclick="window.app.decreaseQuantity('${item.id}')">−</button>
            <span>${item.quantity}</span>
            <button class="btn btn-sm btn-secondary" onclick="window.app.increaseQuantity('${item.id}')">+</button>
          </div>
        </div>
      </div>
    `).join('');

    cartSummary.innerHTML = `
      <div class="cart-summary-row">
        <span>Subtotal</span>
        <span>${window.uiService.formatCurrency(summary.subtotal)}</span>
      </div>
      <div class="cart-summary-row">
        <span>Taxes & Fees</span>
        <span>${window.uiService.formatCurrency(summary.taxes)}</span>
      </div>
      <div class="cart-summary-row">
        <span>Delivery Fee</span>
        <span>${summary.deliveryFee === 0 ? 'FREE' : window.uiService.formatCurrency(summary.deliveryFee)}</span>
      </div>
      <div class="cart-summary-row total">
        <span>Total</span>
        <span>${window.uiService.formatCurrency(summary.total)}</span>
      </div>
      <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="window.app.checkout()">
        Proceed to Checkout
      </button>
    `;
  }

  // Checkout
  checkout() {
    if (!window.authService.isAuthenticated()) {
      window.uiService.showAuthModal();
      return;
    }

    // Simple checkout - in production, you'd have address selection, payment, etc.
    const confirmed = confirm('Place order with Cash on Delivery?');
    if (confirmed) {
      window.orderService.placeOrder({
        address: 'Default Address',
        paymentMethod: 'Cash on Delivery'
      }).then(() => {
        this.toggleCart();
        window.location.hash = '#orders';
      });
    }
  }

  // Update auth UI
  updateAuthUI(user) {
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
      if (user) {
        authBtn.innerHTML = `
          <img src="${user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || user.email)}" 
               class="user-avatar" 
               onclick="window.location.hash='#profile'">
        `;
      } else {
        authBtn.innerHTML = `
          <button class="btn btn-primary btn-sm" onclick="window.uiService.showAuthModal()">Sign In</button>
        `;
      }
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new FastFoodzApp();
  window.app.init();
});
