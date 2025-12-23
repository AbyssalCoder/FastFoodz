// FastFoodz - Restaurant Service
// Fetches REAL restaurants from OpenStreetMap (NO MOCK DATA!)

class RestaurantService {
    constructor() {
        this.restaurants = [];
        this.filteredRestaurants = [];
        this.currentFilters = {
            search: '',
            cuisine: null,
            rating: null,
            deliveryTime: null,
            isVeg: null
        };
        this.isLoading = false;
        this.hasLoaded = false;
    }

    // Load restaurants from OpenStreetMap via backend
    async loadRestaurants() {
        if (this.isLoading) {
            console.log('Already loading restaurants...');
            return this.restaurants;
        }

        this.isLoading = true;

        try {
            // Get user's current location
            const userLocation = await window.locationService.getUserLocation();

            if (!userLocation) {
                throw new Error('Unable to get user location');
            }

            console.log(`🔍 Fetching REAL restaurants near ${userLocation.lat}, ${userLocation.lng}...`);

            // Fetch restaurants from OpenStreetMap
            const realRestaurants = await yelpService.searchRestaurants(
                userLocation.lat,
                userLocation.lng,
                5000, // 5km radius
                50    // max 50 results
            );

            this.restaurants = realRestaurants;
            console.log(`✅ Loaded ${this.restaurants.length} REAL restaurants from OpenStreetMap`);

            // Calculate distances and sort
            this.updateDistances();
            this.applyFilters();

            this.hasLoaded = true;
            this.isLoading = false;

            return this.restaurants;
        } catch (error) {
            console.error('❌ Failed to load restaurants:', error);
            this.isLoading = false;
            throw error; // Throw error instead of falling back to mock data
        }
    }

    // Update distances for all restaurants
    updateDistances() {
        this.restaurants = window.locationService.sortByDistance(this.restaurants);
    }

    // Apply filters
    applyFilters() {
        let filtered = [...this.restaurants];

        // Search filter
        if (this.currentFilters.search) {
            const searchLower = this.currentFilters.search.toLowerCase();
            filtered = filtered.filter(restaurant => {
                const nameMatch = restaurant.name.toLowerCase().includes(searchLower);

                const cuisines = Array.isArray(restaurant.cuisines)
                    ? restaurant.cuisines
                    : restaurant.cuisines.split(',').map(c => c.trim());

                const cuisineMatch = cuisines.some(c =>
                    c.toLowerCase().includes(searchLower)
                );

                const menuMatch = restaurant.menu && restaurant.menu.some(item =>
                    item.name.toLowerCase().includes(searchLower)
                );

                return nameMatch || cuisineMatch || menuMatch;
            });
        }

        // Cuisine filter
        if (this.currentFilters.cuisine) {
            filtered = filtered.filter(restaurant => {
                const cuisines = Array.isArray(restaurant.cuisines)
                    ? restaurant.cuisines
                    : restaurant.cuisines.split(',').map(c => c.trim());

                return cuisines.some(c => c.includes(this.currentFilters.cuisine));
            });
        }

        // Rating filter
        if (this.currentFilters.rating) {
            filtered = filtered.filter(restaurant =>
                parseFloat(restaurant.rating) >= this.currentFilters.rating
            );
        }

        // Delivery time filter (in minutes)
        if (this.currentFilters.deliveryTime) {
            filtered = filtered.filter(restaurant => {
                const maxTime = parseInt(restaurant.deliveryTime.split('-')[1]);
                return maxTime <= this.currentFilters.deliveryTime;
            });
        }

        // Veg filter
        if (this.currentFilters.isVeg === true) {
            filtered = filtered.filter(restaurant => restaurant.isVeg);
        }

        this.filteredRestaurants = filtered;
        return filtered;
    }

    // Set search query
    setSearch(query) {
        this.currentFilters.search = query;
        return this.applyFilters();
    }

    // Set cuisine filter
    setCuisineFilter(cuisine) {
        this.currentFilters.cuisine = cuisine;
        return this.applyFilters();
    }

    // Set rating filter
    setRatingFilter(rating) {
        this.currentFilters.rating = rating;
        return this.applyFilters();
    }

    // Set delivery time filter
    setDeliveryTimeFilter(time) {
        this.currentFilters.deliveryTime = time;
        return this.applyFilters();
    }

    // Set veg filter
    setVegFilter(isVeg) {
        this.currentFilters.isVeg = isVeg;
        return this.applyFilters();
    }

    // Clear all filters
    clearFilters() {
        this.currentFilters = {
            search: '',
            cuisine: null,
            rating: null,
            deliveryTime: null,
            isVeg: null
        };
        return this.applyFilters();
    }

    // Get filtered restaurants
    getRestaurants() {
        return this.filteredRestaurants.length > 0 ? this.filteredRestaurants : this.restaurants;
    }

    // Get restaurant by ID
    getRestaurantById(id) {
        return this.restaurants.find(r => r.id === id);
    }

    // Get all unique cuisines
    getAllCuisines() {
        const cuisines = new Set();
        this.restaurants.forEach(restaurant => {
            const restaurantCuisines = Array.isArray(restaurant.cuisines)
                ? restaurant.cuisines
                : restaurant.cuisines.split(',').map(c => c.trim());

            restaurantCuisines.forEach(cuisine => cuisines.add(cuisine));
        });
        return Array.from(cuisines).sort();
    }

    // Get restaurant menu
    getMenu(restaurantId) {
        const restaurant = this.getRestaurantById(restaurantId);
        return restaurant ? restaurant.menu : [];
    }

    // Search menu items across all restaurants
    searchMenuItems(query) {
        const results = [];
        const queryLower = query.toLowerCase();

        this.restaurants.forEach(restaurant => {
            if (!restaurant.menu) return;

            const matchingItems = restaurant.menu.filter(item =>
                item.name.toLowerCase().includes(queryLower) ||
                (item.description && item.description.toLowerCase().includes(queryLower))
            );

            matchingItems.forEach(item => {
                results.push({
                    ...item,
                    restaurantId: restaurant.id,
                    restaurantName: restaurant.name
                });
            });
        });

        return results;
    }

    // Refresh restaurants (re-fetch from API)
    async refresh() {
        this.hasLoaded = false;
        this.restaurants = [];
        this.filteredRestaurants = [];
        return await this.loadRestaurants();
    }
}

// Create global instance
window.restaurantService = new RestaurantService();
