// FastFoodz - Shopping Cart Service

class CartService {
    constructor() {
        this.cart = this.loadCart();
        this.listeners = [];
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const savedCart = localStorage.getItem('fastfoodz_cart');
            return savedCart ? JSON.parse(savedCart) : { items: [], restaurantId: null, restaurantName: null };
        } catch (error) {
            console.error('Error loading cart:', error);
            return { items: [], restaurantId: null, restaurantName: null };
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem('fastfoodz_cart', JSON.stringify(this.cart));
            this.notifyListeners();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    // Add listener for cart changes
    onChange(callback) {
        this.listeners.push(callback);
    }

    // Notify all listeners
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.cart));
    }

    // Add item to cart
    addItem(item, restaurant) {
        // Check if cart has items from a different restaurant
        if (this.cart.items.length > 0 && this.cart.restaurantId !== restaurant.id) {
            const confirm = window.confirm(
                `Your cart contains items from ${this.cart.restaurantName}. Do you want to clear the cart and add items from ${restaurant.name}?`
            );

            if (!confirm) return false;
            this.clearCart();
        }

        // Set restaurant info if cart is empty
        if (this.cart.items.length === 0) {
            this.cart.restaurantId = restaurant.id;
            this.cart.restaurantName = restaurant.name;
        }

        // Check if item already exists in cart
        const existingItemIndex = this.cart.items.findIndex(
            cartItem => cartItem.id === item.id
        );

        if (existingItemIndex > -1) {
            this.cart.items[existingItemIndex].quantity += 1;
        } else {
            this.cart.items.push({
                ...item,
                quantity: 1,
                restaurantId: restaurant.id,
                restaurantName: restaurant.name
            });
        }

        this.saveCart();
        window.uiService.showToast('success', 'Added to Cart', `${item.name} added`);
        return true;
    }

    // Remove item from cart
    removeItem(itemId) {
        this.cart.items = this.cart.items.filter(item => item.id !== itemId);

        // Clear restaurant info if cart is empty
        if (this.cart.items.length === 0) {
            this.cart.restaurantId = null;
            this.cart.restaurantName = null;
        }

        this.saveCart();
        window.uiService.showToast('info', 'Removed', 'Item removed from cart');
    }

    // Update item quantity
    updateQuantity(itemId, quantity) {
        const item = this.cart.items.find(item => item.id === itemId);

        if (!item) return;

        if (quantity <= 0) {
            this.removeItem(itemId);
            return;
        }

        item.quantity = quantity;
        this.saveCart();
    }

    // Increase item quantity
    increaseQuantity(itemId) {
        const item = this.cart.items.find(item => item.id === itemId);
        if (item) {
            item.quantity += 1;
            this.saveCart();
        }
    }

    // Decrease item quantity
    decreaseQuantity(itemId) {
        const item = this.cart.items.find(item => item.id === itemId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
                this.saveCart();
            } else {
                this.removeItem(itemId);
            }
        }
    }

    // Get cart items
    getItems() {
        return this.cart.items;
    }

    // Get cart item count
    getItemCount() {
        return this.cart.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Get cart subtotal
    getSubtotal() {
        return this.cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    // Calculate taxes (5% GST)
    getTaxes() {
        return this.getSubtotal() * 0.05;
    }

    // Calculate delivery fee based on distance
    getDeliveryFee() {
        const subtotal = this.getSubtotal();

        // Free delivery for orders above ₹200
        if (subtotal >= 200) return 0;

        // Base delivery fee
        return 40;
    }

    // Get cart total
    getTotal() {
        return this.getSubtotal() + this.getTaxes() + this.getDeliveryFee();
    }

    // Get cart summary
    getSummary() {
        return {
            items: this.cart.items,
            itemCount: this.getItemCount(),
            subtotal: this.getSubtotal(),
            taxes: this.getTaxes(),
            deliveryFee: this.getDeliveryFee(),
            total: this.getTotal(),
            restaurantId: this.cart.restaurantId,
            restaurantName: this.cart.restaurantName
        };
    }

    // Clear cart
    clearCart() {
        this.cart = { items: [], restaurantId: null, restaurantName: null };
        this.saveCart();
    }

    // Check if item is in cart
    isInCart(itemId) {
        return this.cart.items.some(item => item.id === itemId);
    }

    // Get item quantity in cart
    getItemQuantity(itemId) {
        const item = this.cart.items.find(item => item.id === itemId);
        return item ? item.quantity : 0;
    }
}

// Create global instance
window.cartService = new CartService();
