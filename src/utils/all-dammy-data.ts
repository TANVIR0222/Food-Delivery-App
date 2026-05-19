export const homeCarousel = [
  {
    id: 1,
    title: "Fresh Taste, Every Bite 🍽️",
    des: "Discover chef-special dishes made fresh daily",
    image: require("@/assets/all-dammy-image/image-banner-one.jpg"),
  },
  {
    id: 2,
    title: "Exclusive Chef Specials 👨‍🍳",
    des: "Taste premium recipes crafted by top chefs",
    image: require("@/assets/all-dammy-image/image-banner-two.jpg"),
  },
  {
    id: 3,
    title: "Hot Deals on Meals 🔥",
    des: "Enjoy discounts on your favorite restaurant items",
    image: require("@/assets/all-dammy-image/image-banner-three.jpg"),
  },
  {
    id: 4,
    title: "Fast Delivery, Hot Food 🚀",
    des: "Get your favorite meals delivered in minutes",
    image: require("@/assets/all-dammy-image/image-banner-one.jpg"),
  },
];

export const foodCategory = [
  {
    id: 1,
    title: "Burgers",
    image: require("@/assets/all-dammy-image/burgers-01.jpg"),
  },
  {
    id: 2,
    title: "Pizza",
    image: require("@/assets/all-dammy-image/pizza-01.jpg"),
  },
  {
    id: 3,
    title: "Seafood",
    image: require("@/assets/all-dammy-image/seafood-01.jpg"),
  },
  {
    id: 4,
    title: "Desserts",
    image: require("@/assets/all-dammy-image/desserts-01.jpg"),
  },
  {
    id: 5,
    title: "Healthy Food",
    image: require("@/assets/all-dammy-image/healthy-food-01.jpg"),
  },
];

export const restaurantData = [
  {
    id: 1,
    name: "Sub Lover's - Mohakhali",
    category: "Fast Food",
    deliveryTime: "15 min",
    rating: 4.8,
    reviews: "1000+",
    deliveryFee: "Tk49",
    offer: "Free for first order",
    image: require("@/assets/all-dammy-image/more-food.jpg"),
  },
  {
    id: 2,
    name: "Golden Pizza - Mohakhali",
    category: "Pizza",
    deliveryTime: "15 min",
    rating: 4.8,
    reviews: "2000+",
    deliveryFee: "Tk44",
    offer: "Free for first order",
    image: require("@/assets/all-dammy-image/healthy-food-03.jpg"),
  },
  {
    id: 3,
    name: "Deshi Bhuna House",
    category: "Bangla Food",
    deliveryTime: "20 min",
    rating: 4.7,
    reviews: "500+",
    deliveryFee: "Tk39",
    offer: "Free for first order",
    image: require("@/assets/all-dammy-image/image-banner-three.jpg"),
  },
];

export const restaurantAllData = [
  {
    id: "res_01",
    name: "Bottega Restorante",
    description: "Italian restaurant with various dishes",
    rating: 4.6,
    reviewCount: 456,
    image: require("@/assets/all-dammy-image/burgers-01.jpg"),
    minPrice: "49rb",
    numericMinPrice: 49000,
    distanceKm: 4.6,
    deliveryTimeMins: 15,
    hasHeart: false,
    badges: ["Extra discount", "Free delivery"],
    menu: [
      {
        id: "food_101",
        title: "Veggie tomato mix",
        price: "₦1,900",
        numericPrice: 1900,
        image: require("@/assets/all-dammy-image/burgers-01.jpg"),
      },
    ],
  },
  {
    id: "res_02",
    name: "SOULFOOD Jakarta",
    description: "Indonesian comfort eats served..",
    rating: 4.7,
    reviewCount: 346,
    image: require("@/assets/all-dammy-image/burgers-01.jpg"),
    minPrice: "35rb",
    numericMinPrice: 35000,
    distanceKm: 3.2,
    deliveryTimeMins: 10,
    hasHeart: false,
    badges: ["Extra discount"],
    menu: [
      {
        id: "food_102",
        title: "Traditional Satay",
        price: "₦2,400",
        numericPrice: 2400,
        image: "https://example.com/images/satay.png",
      },
    ],
  },
  {
    id: "res_03",
    name: "Greyhound Cafe",
    description: "Hip, industrial-style eatery with..",
    rating: 4.2,
    reviewCount: 354,
    image: require("@/assets/all-dammy-image/burgers-01.jpg"),
    minPrice: "39rb",
    numericMinPrice: 39000,
    distanceKm: 2.6,
    deliveryTimeMins: 10,
    hasHeart: false,
    badges: ["Free delivery"],
    menu: [
      {
        id: "food_103",
        title: "Industrial Fusion Salad",
        price: "₦2,100",
        numericPrice: 2100,
        image: require("@/assets/all-dammy-image/burgers-01.jpg"),
      },
    ],
  },
];
