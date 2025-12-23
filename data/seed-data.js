// FastFoodz - Restaurant Seed Data (30+ Restaurants in Kolkata)

const restaurantSeedData = [
    {
        id: 'rest_001',
        name: 'Spice Junction',
        cuisines: ['North Indian', 'Mughlai', 'Tandoor'],
        rating: 4.5,
        deliveryTime: '30-35 min',
        priceForTwo: 400,
        location: { lat: 22.5726, lng: 88.3639 },
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
        isVeg: false,
        menu: [
            { id: 'item_001', name: 'Butter Chicken', price: 320, description: 'Creamy tomato-based curry with tender chicken', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', type: 'non-veg', category: 'Main Course' },
            { id: 'item_002', name: 'Paneer Tikka Masala', price: 280, description: 'Grilled cottage cheese in rich gravy', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', type: 'veg', category: 'Main Course' },
            { id: 'item_003', name: 'Garlic Naan', price: 60, description: 'Soft bread with garlic and butter', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', type: 'veg', category: 'Breads' },
            { id: 'item_004', name: 'Tandoori Chicken', price: 380, description: 'Marinated chicken grilled in tandoor', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400', type: 'non-veg', category: 'Starters' },
            { id: 'item_005', name: 'Dal Makhani', price: 220, description: 'Creamy black lentils slow-cooked overnight', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', type: 'veg', category: 'Main Course' }
        ]
    },
    {
        id: 'rest_002',
        name: 'Pizza Paradise',
        cuisines: ['Italian', 'Pizza', 'Pasta'],
        rating: 4.3,
        deliveryTime: '25-30 min',
        priceForTwo: 500,
        location: { lat: 22.5744, lng: 88.3629 },
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
        isVeg: false,
        menu: [
            { id: 'item_006', name: 'Margherita Pizza', price: 299, description: 'Classic pizza with tomato, mozzarella, and basil', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', type: 'veg', category: 'Pizza' },
            { id: 'item_007', name: 'Pepperoni Pizza', price: 399, description: 'Loaded with pepperoni and cheese', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', type: 'non-veg', category: 'Pizza' },
            { id: 'item_008', name: 'Pasta Alfredo', price: 320, description: 'Creamy white sauce pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400', type: 'veg', category: 'Pasta' },
            { id: 'item_009', name: 'Garlic Bread', price: 120, description: 'Toasted bread with garlic butter', image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=400', type: 'veg', category: 'Sides' }
        ]
    },
    {
        id: 'rest_003',
        name: 'Burger Bros',
        cuisines: ['American', 'Burgers', 'Fast Food'],
        rating: 4.2,
        deliveryTime: '20-25 min',
        priceForTwo: 350,
        location: { lat: 22.5697, lng: 88.3697 },
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
        isVeg: false,
        menu: [
            { id: 'item_010', name: 'Classic Beef Burger', price: 199, description: 'Juicy beef patty with lettuce and tomato', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', type: 'non-veg', category: 'Burgers' },
            { id: 'item_011', name: 'Veggie Burger', price: 149, description: 'Plant-based patty with fresh veggies', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400', type: 'veg', category: 'Burgers' },
            { id: 'item_012', name: 'French Fries', price: 99, description: 'Crispy golden fries', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400', type: 'veg', category: 'Sides' },
            { id: 'item_013', name: 'Chicken Wings', price: 249, description: 'Spicy buffalo wings', image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400', type: 'non-veg', category: 'Starters' }
        ]
    },
    {
        id: 'rest_004',
        name: 'Sushi Station',
        cuisines: ['Japanese', 'Sushi', 'Asian'],
        rating: 4.6,
        deliveryTime: '35-40 min',
        priceForTwo: 800,
        location: { lat: 22.5645, lng: 88.3756 },
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
        isVeg: false,
        menu: [
            { id: 'item_014', name: 'California Roll', price: 380, description: 'Crab, avocado, and cucumber roll', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', type: 'non-veg', category: 'Sushi' },
            { id: 'item_015', name: 'Vegetable Tempura', price: 320, description: 'Crispy fried vegetables', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400', type: 'veg', category: 'Starters' },
            { id: 'item_016', name: 'Salmon Nigiri', price: 450, description: 'Fresh salmon over rice', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400', type: 'non-veg', category: 'Sushi' }
        ]
    },
    {
        id: 'rest_005',
        name: 'Taco Fiesta',
        cuisines: ['Mexican', 'Tex-Mex', 'Burritos'],
        rating: 4.4,
        deliveryTime: '25-30 min',
        priceForTwo: 450,
        location: { lat: 22.5789, lng: 88.3589 },
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
        isVeg: false,
        menu: [
            { id: 'item_017', name: 'Chicken Tacos', price: 249, description: 'Soft tacos with grilled chicken', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400', type: 'non-veg', category: 'Tacos' },
            { id: 'item_018', name: 'Veggie Burrito', price: 229, description: 'Rice, beans, and vegetables wrapped', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', type: 'veg', category: 'Burritos' },
            { id: 'item_019', name: 'Nachos Supreme', price: 199, description: 'Loaded nachos with cheese and salsa', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400', type: 'veg', category: 'Starters' }
        ]
    },
    {
        id: 'rest_006',
        name: 'Biryani House',
        cuisines: ['Biryani', 'Hyderabadi', 'Indian'],
        rating: 4.7,
        deliveryTime: '40-45 min',
        priceForTwo: 500,
        location: { lat: 22.5656, lng: 88.3456 },
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
        isVeg: false,
        menu: [
            { id: 'item_020', name: 'Chicken Biryani', price: 280, description: 'Aromatic rice with tender chicken', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', type: 'non-veg', category: 'Biryani' },
            { id: 'item_021', name: 'Mutton Biryani', price: 350, description: 'Slow-cooked mutton with basmati rice', image: 'https://images.unsplash.com/photo-1633945274309-2c8c2b0e3d2c?w=400', type: 'non-veg', category: 'Biryani' },
            { id: 'item_022', name: 'Veg Biryani', price: 220, description: 'Mixed vegetables with fragrant rice', image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400', type: 'veg', category: 'Biryani' },
            { id: 'item_023', name: 'Raita', price: 60, description: 'Cooling yogurt with cucumber', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', type: 'veg', category: 'Sides' }
        ]
    },
    {
        id: 'rest_007',
        name: 'Noodle Bowl',
        cuisines: ['Chinese', 'Thai', 'Asian'],
        rating: 4.1,
        deliveryTime: '30-35 min',
        priceForTwo: 400,
        location: { lat: 22.5812, lng: 88.3712 },
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
        isVeg: false,
        menu: [
            { id: 'item_024', name: 'Hakka Noodles', price: 180, description: 'Stir-fried noodles with vegetables', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400', type: 'veg', category: 'Noodles' },
            { id: 'item_025', name: 'Chicken Fried Rice', price: 220, description: 'Wok-tossed rice with chicken', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', type: 'non-veg', category: 'Rice' },
            { id: 'item_026', name: 'Spring Rolls', price: 150, description: 'Crispy vegetable rolls', image: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=400', type: 'veg', category: 'Starters' }
        ]
    },
    {
        id: 'rest_008',
        name: 'Dessert Dreams',
        cuisines: ['Desserts', 'Ice Cream', 'Bakery'],
        rating: 4.8,
        deliveryTime: '20-25 min',
        priceForTwo: 300,
        location: { lat: 22.5534, lng: 88.3598 },
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
        isVeg: true,
        menu: [
            { id: 'item_027', name: 'Chocolate Brownie', price: 120, description: 'Warm brownie with ice cream', image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400', type: 'veg', category: 'Desserts' },
            { id: 'item_028', name: 'Tiramisu', price: 180, description: 'Classic Italian dessert', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', type: 'veg', category: 'Desserts' },
            { id: 'item_029', name: 'Vanilla Ice Cream', price: 80, description: 'Premium vanilla ice cream', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', type: 'veg', category: 'Ice Cream' }
        ]
    },
    {
        id: 'rest_009',
        name: 'Cafe Mocha',
        cuisines: ['Cafe', 'Coffee', 'Snacks'],
        rating: 4.3,
        deliveryTime: '15-20 min',
        priceForTwo: 250,
        location: { lat: 22.5678, lng: 88.3523 },
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
        isVeg: true,
        menu: [
            { id: 'item_030', name: 'Cappuccino', price: 120, description: 'Espresso with steamed milk foam', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', type: 'veg', category: 'Beverages' },
            { id: 'item_031', name: 'Croissant', price: 80, description: 'Buttery flaky pastry', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', type: 'veg', category: 'Bakery' },
            { id: 'item_032', name: 'Club Sandwich', price: 180, description: 'Triple-decker sandwich', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400', type: 'veg', category: 'Snacks' }
        ]
    },
    {
        id: 'rest_010',
        name: 'South Indian Express',
        cuisines: ['South Indian', 'Dosa', 'Idli'],
        rating: 4.5,
        deliveryTime: '25-30 min',
        priceForTwo: 300,
        location: { lat: 22.5823, lng: 88.3445 },
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800',
        isVeg: true,
        menu: [
            { id: 'item_033', name: 'Masala Dosa', price: 120, description: 'Crispy dosa with potato filling', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', type: 'veg', category: 'Dosa' },
            { id: 'item_034', name: 'Idli Sambar', price: 80, description: 'Steamed rice cakes with lentil curry', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', type: 'veg', category: 'Breakfast' },
            { id: 'item_035', name: 'Filter Coffee', price: 40, description: 'Traditional South Indian coffee', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400', type: 'veg', category: 'Beverages' }
        ]
    }
];

// Continue with more restaurants...
const additionalRestaurants = [
    {
        id: 'rest_011',
        name: 'Kebab Corner',
        cuisines: ['Kebabs', 'Middle Eastern', 'Grills'],
        rating: 4.4,
        deliveryTime: '30-35 min',
        priceForTwo: 450,
        location: { lat: 22.5567, lng: 88.3689 },
        image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800',
        isVeg: false,
        menu: [
            { id: 'item_036', name: 'Seekh Kebab', price: 280, description: 'Minced meat grilled on skewers', image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400', type: 'non-veg', category: 'Kebabs' },
            { id: 'item_037', name: 'Paneer Tikka', price: 240, description: 'Grilled cottage cheese cubes', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400', type: 'veg', category: 'Kebabs' }
        ]
    },
    {
        id: 'rest_012',
        name: 'Healthy Bites',
        cuisines: ['Healthy', 'Salads', 'Smoothies'],
        rating: 4.6,
        deliveryTime: '20-25 min',
        priceForTwo: 350,
        location: { lat: 22.5701, lng: 88.3512 },
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
        isVeg: true,
        menu: [
            { id: 'item_038', name: 'Greek Salad', price: 220, description: 'Fresh vegetables with feta cheese', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', type: 'veg', category: 'Salads' },
            { id: 'item_039', name: 'Berry Smoothie', price: 150, description: 'Mixed berries with yogurt', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400', type: 'veg', category: 'Beverages' }
        ]
    },
    {
        id: 'rest_013',
        name: 'Seafood Shack',
        cuisines: ['Seafood', 'Fish', 'Coastal'],
        rating: 4.3,
        deliveryTime: '35-40 min',
        priceForTwo: 600,
        location: { lat: 22.5489, lng: 88.3734 },
        image: 'https://images.unsplash.com/photo-1559737558-2f5a2f3e2f3b?w=800',
        isVeg: false,
        menu: [
            { id: 'item_040', name: 'Fish Fry', price: 320, description: 'Crispy fried fish', image: 'https://images.unsplash.com/photo-1580959375944-0b9e6d8e8b0e?w=400', type: 'non-veg', category: 'Seafood' },
            { id: 'item_041', name: 'Prawn Curry', price: 420, description: 'Spicy prawn curry', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400', type: 'non-veg', category: 'Seafood' }
        ]
    },
    {
        id: 'rest_014',
        name: 'Street Food Hub',
        cuisines: ['Street Food', 'Chaat', 'Indian'],
        rating: 4.2,
        deliveryTime: '20-25 min',
        priceForTwo: 200,
        location: { lat: 22.5834, lng: 88.3567 },
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800',
        isVeg: true,
        menu: [
            { id: 'item_042', name: 'Pani Puri', price: 60, description: 'Crispy puris with tangy water', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400', type: 'veg', category: 'Chaat' },
            { id: 'item_043', name: 'Pav Bhaji', price: 100, description: 'Spicy vegetable curry with bread', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400', type: 'veg', category: 'Street Food' }
        ]
    },
    {
        id: 'rest_015',
        name: 'BBQ Nation',
        cuisines: ['BBQ', 'Grills', 'Continental'],
        rating: 4.5,
        deliveryTime: '40-45 min',
        priceForTwo: 700,
        location: { lat: 22.5612, lng: 88.3801 },
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        isVeg: false,
        menu: [
            { id: 'item_044', name: 'BBQ Chicken', price: 380, description: 'Grilled chicken with BBQ sauce', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400', type: 'non-veg', category: 'BBQ' },
            { id: 'item_045', name: 'Grilled Vegetables', price: 280, description: 'Assorted grilled veggies', image: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=400', type: 'veg', category: 'BBQ' }
        ]
    }
];

// Add 15 more restaurants to reach 30+
const moreRestaurants = [
    { id: 'rest_016', name: 'Momos Mania', cuisines: ['Momos', 'Tibetan', 'Chinese'], rating: 4.3, deliveryTime: '20-25 min', priceForTwo: 250, location: { lat: 22.5756, lng: 88.3478 }, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800', isVeg: false, menu: [{ id: 'item_046', name: 'Chicken Momos', price: 120, description: 'Steamed chicken dumplings', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400', type: 'non-veg', category: 'Momos' }] },
    { id: 'rest_017', name: 'Pasta Palace', cuisines: ['Italian', 'Pasta', 'Continental'], rating: 4.4, deliveryTime: '30-35 min', priceForTwo: 450, location: { lat: 22.5623, lng: 88.3523 }, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800', isVeg: false, menu: [{ id: 'item_047', name: 'Spaghetti Carbonara', price: 320, description: 'Creamy pasta with bacon', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400', type: 'non-veg', category: 'Pasta' }] },
    { id: 'rest_018', name: 'Sandwich Station', cuisines: ['Sandwiches', 'Fast Food', 'Cafe'], rating: 4.1, deliveryTime: '15-20 min', priceForTwo: 200, location: { lat: 22.5890, lng: 88.3612 }, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800', isVeg: true, menu: [{ id: 'item_048', name: 'Grilled Sandwich', price: 100, description: 'Toasted sandwich with vegetables', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400', type: 'veg', category: 'Sandwiches' }] },
    { id: 'rest_019', name: 'Thali House', cuisines: ['Indian', 'Thali', 'Gujarati'], rating: 4.6, deliveryTime: '35-40 min', priceForTwo: 350, location: { lat: 22.5445, lng: 88.3667 }, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800', isVeg: true, menu: [{ id: 'item_049', name: 'Gujarati Thali', price: 280, description: 'Complete meal with variety', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', type: 'veg', category: 'Thali' }] },
    { id: 'rest_020', name: 'Waffle World', cuisines: ['Waffles', 'Desserts', 'Breakfast'], rating: 4.5, deliveryTime: '25-30 min', priceForTwo: 300, location: { lat: 22.5778, lng: 88.3789 }, image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800', isVeg: true, menu: [{ id: 'item_050', name: 'Belgian Waffle', price: 180, description: 'Crispy waffle with toppings', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400', type: 'veg', category: 'Waffles' }] },
    { id: 'rest_021', name: 'Rolls & Wraps', cuisines: ['Rolls', 'Wraps', 'Fast Food'], rating: 4.2, deliveryTime: '20-25 min', priceForTwo: 250, location: { lat: 22.5534, lng: 88.3445 }, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800', isVeg: false, menu: [{ id: 'item_051', name: 'Chicken Kathi Roll', price: 140, description: 'Wrapped chicken with spices', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', type: 'non-veg', category: 'Rolls' }] },
    { id: 'rest_022', name: 'Juice Junction', cuisines: ['Juices', 'Beverages', 'Healthy'], rating: 4.4, deliveryTime: '15-20 min', priceForTwo: 150, location: { lat: 22.5867, lng: 88.3534 }, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800', isVeg: true, menu: [{ id: 'item_052', name: 'Fresh Orange Juice', price: 80, description: 'Freshly squeezed orange juice', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', type: 'veg', category: 'Juices' }] },
    { id: 'rest_023', name: 'Paratha Point', cuisines: ['Parathas', 'North Indian', 'Breakfast'], rating: 4.3, deliveryTime: '25-30 min', priceForTwo: 200, location: { lat: 22.5601, lng: 88.3723 }, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800', isVeg: true, menu: [{ id: 'item_053', name: 'Aloo Paratha', price: 80, description: 'Stuffed potato flatbread', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', type: 'veg', category: 'Parathas' }] },
    { id: 'rest_024', name: 'Ramen House', cuisines: ['Japanese', 'Ramen', 'Noodles'], rating: 4.7, deliveryTime: '35-40 min', priceForTwo: 500, location: { lat: 22.5712, lng: 88.3456 }, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800', isVeg: false, menu: [{ id: 'item_054', name: 'Tonkotsu Ramen', price: 380, description: 'Rich pork bone broth ramen', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', type: 'non-veg', category: 'Ramen' }] },
    { id: 'rest_025', name: 'Falafel Factory', cuisines: ['Middle Eastern', 'Lebanese', 'Mediterranean'], rating: 4.5, deliveryTime: '25-30 min', priceForTwo: 350, location: { lat: 22.5823, lng: 88.3678 }, image: 'https://images.unsplash.com/photo-1593252719532-f8d6a35e0a8e?w=800', isVeg: true, menu: [{ id: 'item_055', name: 'Falafel Wrap', price: 180, description: 'Crispy chickpea balls in pita', image: 'https://images.unsplash.com/photo-1593252719532-f8d6a35e0a8e?w=400', type: 'veg', category: 'Wraps' }] },
    { id: 'rest_026', name: 'Steak House', cuisines: ['Steaks', 'Continental', 'Grills'], rating: 4.8, deliveryTime: '45-50 min', priceForTwo: 900, location: { lat: 22.5456, lng: 88.3589 }, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800', isVeg: false, menu: [{ id: 'item_056', name: 'Ribeye Steak', price: 680, description: 'Premium grilled ribeye', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', type: 'non-veg', category: 'Steaks' }] },
    { id: 'rest_027', name: 'Dim Sum Delight', cuisines: ['Chinese', 'Dim Sum', 'Asian'], rating: 4.6, deliveryTime: '30-35 min', priceForTwo: 450, location: { lat: 22.5689, lng: 88.3812 }, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800', isVeg: false, menu: [{ id: 'item_057', name: 'Assorted Dim Sum', price: 320, description: 'Variety of steamed dumplings', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400', type: 'non-veg', category: 'Dim Sum' }] },
    { id: 'rest_028', name: 'Crepe Corner', cuisines: ['Crepes', 'French', 'Desserts'], rating: 4.4, deliveryTime: '20-25 min', priceForTwo: 300, location: { lat: 22.5734, lng: 88.3501 }, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800', isVeg: true, menu: [{ id: 'item_058', name: 'Nutella Crepe', price: 180, description: 'Thin pancake with Nutella', image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400', type: 'veg', category: 'Crepes' }] },
    { id: 'rest_029', name: 'Curry Kitchen', cuisines: ['Indian', 'Curry', 'Home Style'], rating: 4.5, deliveryTime: '30-35 min', priceForTwo: 350, location: { lat: 22.5567, lng: 88.3634 }, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800', isVeg: false, menu: [{ id: 'item_059', name: 'Chicken Curry', price: 260, description: 'Home-style chicken curry', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', type: 'non-veg', category: 'Curry' }] },
    { id: 'rest_030', name: 'Bagel Barn', cuisines: ['Bagels', 'American', 'Breakfast'], rating: 4.3, deliveryTime: '20-25 min', priceForTwo: 250, location: { lat: 22.5801, lng: 88.3723 }, image: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?w=800', isVeg: true, menu: [{ id: 'item_060', name: 'Cream Cheese Bagel', price: 120, description: 'Toasted bagel with cream cheese', image: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?w=400', type: 'veg', category: 'Bagels' }] }
];

// Combine all restaurants
const allRestaurants = [...restaurantSeedData, ...additionalRestaurants, ...moreRestaurants];

// Export for use
window.restaurantSeedData = allRestaurants;

console.log(`✅ Loaded ${allRestaurants.length} restaurants`);
