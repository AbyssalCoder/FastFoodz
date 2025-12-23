// Test Google Places API with new key
const GOOGLE_API_KEY = 'AIzaSyCmg_w4Yo_N8Rz0KQAB3G7kaExaUTEX';

async function testGooglePlacesAPI() {
    const url = 'https://places.googleapis.com/v1/places:searchNearby';

    const requestBody = {
        includedTypes: ["restaurant"],
        maxResultCount: 5,
        locationRestriction: {
            circle: {
                center: {
                    latitude: 22.5726,
                    longitude: 88.3639
                },
                radius: 5000
            }
        }
    };

    console.log('Testing Google Places API with new key...\n');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': GOOGLE_API_KEY,
                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount'
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Status:', response.status, response.statusText);

        const data = await response.json();

        if (response.ok && data.places) {
            console.log(`\n✅ SUCCESS! Found ${data.places.length} real restaurants:\n`);
            data.places.forEach((place, i) => {
                console.log(`${i + 1}. ${place.displayName?.text || 'Unknown'}`);
                console.log(`   Address: ${place.formattedAddress || 'N/A'}`);
                console.log(`   Rating: ${place.rating || 'N/A'} (${place.userRatingCount || 0} reviews)\n`);
            });
        } else {
            console.log('❌ Failed:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testGooglePlacesAPI();
