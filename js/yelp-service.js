// Yelp Fusion API Service
// Fetches real restaurants from backend (OpenStreetMap)
// NO MOCK DATA - Real data only!

class YelpService {
    constructor() {
        this.cache = new Map();
        this.cacheExpiry = 10 * 60 * 1000; // 10 minutes
    }

    /**
     * Search for restaurants using backend proxy (OpenStreetMap)
     * @param {number} latitude - User's latitude
     * @param {number} longitude - User's longitude
     * @param {number} radius - Search radius in meters (default: 5000)
     * @param {number} limit - Maximum number of results (default: 50)
     * @returns {Promise<Array>} Array of restaurant objects
     */
    async searchRestaurants(latitude, longitude, radius = 5000, limit = 50) {
        try {
            // Check cache first
            const cacheKey = `${latitude},${longitude},${radius}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) {
                console.log('✅ Using cached restaurant data');
                return cached;
            }

            console.log(`🔍 Fetching real restaurants from OpenStreetMap...`);

            // Use backend proxy for OpenStreetMap data
            const backendUrl = `http://localhost:3000/api/restaurants?lat=${latitude}&lng=${longitude}&radius=${radius}&limit=${limit}`;

            const response = await fetch(backendUrl);

            if (!response.ok) {
                throw new Error(`Backend returned ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data.success || !data.restaurants) {
                throw new Error('Invalid response from backend');
            }

            console.log(`✅ Fetched ${data.restaurants.length} REAL restaurants from OpenStreetMap`);

            // Cache the results
            this.saveToCache(cacheKey, data.restaurants);

            return data.restaurants;

        } catch (error) {
            console.error('❌ Error fetching restaurants:', error);
            throw new Error(`Failed to load restaurants: ${error.message}. Please check your internet connection.`);
        }
    }

    /**
     * Cache management
     */
    saveToCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    getFromCache(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;

        const age = Date.now() - cached.timestamp;
        if (age > this.cacheExpiry) {
            this.cache.delete(key);
            return null;
        }

        return cached.data;
    }
}

// Export singleton instance
const yelpService = new YelpService();
