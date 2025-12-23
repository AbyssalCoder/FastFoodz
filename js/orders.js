// FastFoodz - Orders Service

class OrderService {
    constructor() {
        this.orders = [];
    }

    // Place a new order
    async placeOrder(orderData) {
        if (!window.authService.isAuthenticated()) {
            window.uiService.showToast('error', 'Sign In Required', 'Please sign in to place an order');
            throw new Error('User not authenticated');
        }

        try {
            const user = window.authService.getCurrentUser();
            const cartSummary = window.cartService.getSummary();

            const order = {
                userId: user.uid,
                userEmail: user.email,
                restaurantId: cartSummary.restaurantId,
                restaurantName: cartSummary.restaurantName,
                items: cartSummary.items,
                subtotal: cartSummary.subtotal,
                taxes: cartSummary.taxes,
                deliveryFee: cartSummary.deliveryFee,
                total: cartSummary.total,
                address: orderData.address,
                paymentMethod: orderData.paymentMethod || 'Cash on Delivery',
                status: 'placed',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                estimatedDelivery: this.calculateEstimatedDelivery()
            };

            // Save to Firestore
            const docRef = await window.firebaseApp.db
                .collection(window.firebaseApp.Collections.ORDERS)
                .add(order);

            order.id = docRef.id;

            // Clear cart
            window.cartService.clearCart();

            window.uiService.showToast('success', 'Order Placed!', `Order #${docRef.id.slice(0, 8)} confirmed`);

            return order;
        } catch (error) {
            console.error('Error placing order:', error);
            window.uiService.showToast('error', 'Order Failed', error.message);
            throw error;
        }
    }

    // Calculate estimated delivery time
    calculateEstimatedDelivery() {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 35); // Average 35 minutes
        return now;
    }

    // Get user's order history
    async getOrderHistory() {
        if (!window.authService.isAuthenticated()) {
            return [];
        }

        try {
            const user = window.authService.getCurrentUser();
            const snapshot = await window.firebaseApp.db
                .collection(window.firebaseApp.Collections.ORDERS)
                .where('userId', '==', user.uid)
                .orderBy('createdAt', 'desc')
                .get();

            this.orders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return this.orders;
        } catch (error) {
            console.error('Error fetching order history:', error);
            return [];
        }
    }

    // Get order by ID
    async getOrderById(orderId) {
        try {
            const doc = await window.firebaseApp.db
                .collection(window.firebaseApp.Collections.ORDERS)
                .doc(orderId)
                .get();

            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error('Error fetching order:', error);
            return null;
        }
    }

    // Update order status (for admin/restaurant)
    async updateOrderStatus(orderId, status) {
        try {
            await window.firebaseApp.db
                .collection(window.firebaseApp.Collections.ORDERS)
                .doc(orderId)
                .update({ status });

            window.uiService.showToast('info', 'Order Updated', `Status: ${status}`);
        } catch (error) {
            console.error('Error updating order status:', error);
            window.uiService.showToast('error', 'Update Failed', error.message);
            throw error;
        }
    }

    // Reorder (add previous order items to cart)
    reorder(order) {
        const restaurant = window.restaurantService.getRestaurantById(order.restaurantId);

        if (!restaurant) {
            window.uiService.showToast('error', 'Restaurant Not Found', 'This restaurant is no longer available');
            return;
        }

        // Clear current cart
        window.cartService.clearCart();

        // Add items to cart
        order.items.forEach(item => {
            window.cartService.addItem(item, restaurant);
        });

        window.uiService.showToast('success', 'Items Added', 'Previous order items added to cart');
        window.location.hash = '#cart';
    }

    // Get order status display info
    getStatusInfo(status) {
        const statusMap = {
            'placed': { label: 'Order Placed', color: 'info', icon: '📝' },
            'confirmed': { label: 'Confirmed', color: 'success', icon: '✅' },
            'preparing': { label: 'Preparing', color: 'warning', icon: '👨‍🍳' },
            'out_for_delivery': { label: 'Out for Delivery', color: 'info', icon: '🚚' },
            'delivered': { label: 'Delivered', color: 'success', icon: '✨' },
            'cancelled': { label: 'Cancelled', color: 'error', icon: '❌' }
        };

        return statusMap[status] || { label: status, color: 'info', icon: '📦' };
    }
}

// Create global instance
window.orderService = new OrderService();
