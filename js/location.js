// FastFoodz - Location Services with IP Geolocation Fallback

class LocationService {
    constructor() {
        this.userLocation = null;
        this.defaultLocation = {
            lat: 22.5726,  // Kolkata coordinates
            lng: 88.3639
        };
    }

    // Request user's current location with automatic fallback
    async getUserLocation() {
        // Try GPS first
        try {
            const gpsLocation = await this.getGPSLocation();
            if (gpsLocation) {
                this.userLocation = gpsLocation;
                console.log('✅ User location obtained via GPS:', this.userLocation);
                return this.userLocation;
            }
        } catch (error) {
            console.warn('GPS location failed:', error.message);
        }

        // Fallback to IP-based geolocation (works without HTTPS!)
        try {
            const ipLocation = await this.getIPLocation();
            if (ipLocation) {
                this.userLocation = ipLocation;
                console.log('✅ User location obtained via IP:', this.userLocation);
                return this.userLocation;
            }
        } catch (error) {
            console.warn('IP location failed:', error.message);
        }

        // Final fallback to default location (Kolkata)
        console.warn('⚠️ Using default location (Kolkata)');
        this.userLocation = this.defaultLocation;
        return this.defaultLocation;
    }

    // Get location via GPS
    async getGPSLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    reject(new Error(`GPS error: ${error.message}`));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        });
    }

    // Get location via IP address (FREE, works on HTTP and HTTPS!)
    async getIPLocation() {
        try {
            // Using ipapi.co - free, no API key required, 1000 requests/day
            const response = await fetch('https://ipapi.co/json/');

            if (!response.ok) {
                throw new Error('IP geolocation service unavailable');
            }

            const data = await response.json();

            if (data.latitude && data.longitude) {
                console.log(`📍 IP Location: ${data.city}, ${data.country_name}`);
                return {
                    lat: data.latitude,
                    lng: data.longitude,
                    city: data.city,
                    country: data.country_name
                };
            }

            throw new Error('Invalid IP location data');
        } catch (error) {
            console.error('IP geolocation error:', error);
            return null;
        }
    }

    // Calculate distance between two coordinates using Haversine formula
    // Returns distance in kilometers
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers

        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(lat1)) *
            Math.cos(this.toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return Math.round(distance * 10) / 10; // Round to 1 decimal place
    }

    // Convert degrees to radians
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Get distance from user to a location
    getDistanceFromUser(targetLat, targetLng) {
        if (!this.userLocation) {
            console.warn('User location not set, using default');
            this.userLocation = this.defaultLocation;
        }

        return this.calculateDistance(
            this.userLocation.lat,
            this.userLocation.lng,
            targetLat,
            targetLng
        );
    }

    // Format distance for display
    formatDistance(distanceKm) {
        if (distanceKm < 1) {
            return `${Math.round(distanceKm * 1000)} m`;
        }
        return `${distanceKm} km`;
    }

    // Sort restaurants by distance from user
    sortByDistance(restaurants) {
        return restaurants.map(restaurant => {
            const distance = this.getDistanceFromUser(
                restaurant.location.lat,
                restaurant.location.lng
            );
            return { ...restaurant, distance };
        }).sort((a, b) => a.distance - b.distance);
    }

    // Filter restaurants within a certain radius (in km)
    filterByRadius(restaurants, radiusKm) {
        return restaurants.filter(restaurant => {
            const distance = this.getDistanceFromUser(
                restaurant.location.lat,
                restaurant.location.lng
            );
            return distance <= radiusKm;
        });
    }

    // Get current location or default
    getCurrentLocation() {
        return this.userLocation || this.defaultLocation;
    }
}

// Create global instance
window.locationService = new LocationService();
