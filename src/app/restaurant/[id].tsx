import GlobalTopBar from "@/components/GlobalTopBar";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoriteContext";
import tw from "@/lib/tailwind";
import { restaurantAllData } from "@/utils/all-dammy-data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

// ---------------- MENU CARD ----------------

const MenuCard = ({ item }: any) => {
  return (
    <View
      style={tw`flex-row items-center bg-description2/10 rounded-3xl p-3 mb-4 mx-4`}
    >
      <Image
        source={item.image}
        style={tw`w-24 h-24 rounded-2xl`}
        resizeMode="cover"
      />

      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-lg font-inter-bold`}>{item.title}</Text>

        <Text style={tw`text-orange-500 mt-2 font-inter-bold`}>
          {item.price}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/modal/product-view-modal",
            params: {
              id: item.id,
            },
          })
        }
        style={tw`bg-black px-4 py-2 rounded-full`}
      >
        <Text style={tw`text-white font-inter-semibold`}>View</Text>
      </TouchableOpacity>
    </View>
  );
};

// ---------------- MAIN SCREEN ----------------
// This screen handles deep link: foodapp://restaurant/[id]

const RestaurantDeepLinkScreen = () => {
  const { id } = useLocalSearchParams();

  const restaurant = restaurantAllData.find((item) => item.id === id);
  const { addToCart, cartItems } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(restaurant?.id || "");

  const firstMenuItem = restaurant?.menu?.[0];
  const isAdded = firstMenuItem
    ? cartItems.some((cartItem) => cartItem.id === firstMenuItem.id)
    : false;

  if (!restaurant) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <Ionicons name="restaurant-outline" size={60} color="#ccc" />
        <Text style={tw`text-lg font-inter-bold text-text_gray mt-4`}>
          Restaurant Not Found
        </Text>
        <Text style={tw`text-text_gray mt-2`}>ID: {id}</Text>
        <TouchableOpacity
          onPress={() => router.navigate("/(drawer)/(tabs)")}
          style={tw`bg-primary px-6 py-3 rounded-xl mt-6`}
        >
          <Text style={tw`text-white font-inter-semibold`}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ---------------- RELATED TAB ----------------

  const RelatedTab = () => {
    const currentCategory = restaurant.name.toLowerCase().includes("burger")
      ? "burger"
      : restaurant.name.toLowerCase().includes("pizza")
        ? "pizza"
        : restaurant.name.toLowerCase().includes("dessert")
          ? "dessert"
          : restaurant.name.toLowerCase().includes("healthy") ||
            restaurant.name.toLowerCase().includes("fit")
            ? "healthy"
            : restaurant.name.toLowerCase().includes("sea")
              ? "seafood"
              : "";

    const relatedMenus = restaurantAllData
      .filter((res) => {
        if (currentCategory === "burger") return res.name.toLowerCase().includes("burger");
        if (currentCategory === "pizza") return res.name.toLowerCase().includes("pizza");
        if (currentCategory === "dessert") return res.name.toLowerCase().includes("dessert") || res.name.toLowerCase().includes("sweet");
        if (currentCategory === "healthy") return res.name.toLowerCase().includes("healthy") || res.name.toLowerCase().includes("fit");
        if (currentCategory === "seafood") return res.name.toLowerCase().includes("sea") || res.name.toLowerCase().includes("ocean");
        return false;
      })
      .flatMap((res) => res.menu);

    return (
      <FlatList
        data={relatedMenus}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuCard item={item} />}
        contentContainerStyle={tw`pb-10 pt-4`}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  // ---------------- ALL TAB ----------------

  const AllTab = () => {
    const allMenus = restaurantAllData.flatMap((res) => res.menu);
    return (
      <FlatList
        data={allMenus}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuCard item={item} />}
        contentContainerStyle={tw`pb-10 pt-4`}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* FIXED HEADER IMAGE */}
      <View style={tw`relative`}>
        <Image
          source={restaurant.image}
          style={tw`w-full h-80`}
          resizeMode="cover"
        />

        {/* BACK BUTTON */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`absolute top-14 left-4 bg-white w-10 h-10 rounded-full items-center justify-center`}
        >
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>

        {/* HEART / FAVORITE BUTTON */}
        <TouchableOpacity
          onPress={() => {
            const favItem = {
              id: restaurant.id,
              name: restaurant.name,
              restaurantName: restaurant.name,
              price: restaurant.numericMinPrice,
              rating: restaurant.rating,
              image: restaurant.image,
            };
            toggleFavorite(favItem);
            Alert.alert(
              isFav ? "Removed from Favorites" : "Added to Favorites",
              `${restaurant.name} has been ${isFav ? "removed from" : "added to"} your favorites.`
            );
          }}
          style={tw`absolute top-14 right-4 bg-white w-10 h-10 rounded-full items-center justify-center`}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={22}
            color={isFav ? "#ef4444" : "#333"}
          />
        </TouchableOpacity>
      </View>

      {/* SCROLLABLE AREA */}
      <View style={tw`flex-1`}>
        {/* CONTENT (name, rating etc) */}
        <View style={tw`px-5 pt-5`}>
          <Text style={tw`text-3xl font-inter-bold`}>{restaurant.name}</Text>

          <Text style={tw`text-text_gray mt-2`}>{restaurant.description}</Text>

          <View style={tw`flex-row items-center mt-4`}>
            <Ionicons name="star" size={18} color="#F59E0B" />
            <Text style={tw`ml-2 font-inter-semibold`}>
              {restaurant.rating}
            </Text>
            <Text style={tw`text-text_gray ml-2`}>
              ({restaurant.reviewCount} reviews)
            </Text>
          </View>
        </View>

        {/* ADD TO CART BUTTON */}
        {firstMenuItem && (
          <View style={tw`px-5 mt-4`}>
            <TouchableOpacity
              disabled={isAdded}
              onPress={() => {
                addToCart({
                  id: firstMenuItem.id,
                  restaurantId: restaurant.id,
                  restaurantName: restaurant.name,
                  name: firstMenuItem.title,
                  price: firstMenuItem.numericPrice,
                  image: firstMenuItem.image,
                  quantity: 1,
                });
                Alert.alert("Success", `${firstMenuItem.title} has been added to your cart.`);
              }}
              style={[
                tw`py-3 rounded-2xl`,
                isAdded ? tw`bg-gray` : tw`bg-black`,
              ]}
            >
              <Text style={tw`text-white text-center font-inter-bold`}>
                {isAdded ? "Added to Cart" : "Add to Cart"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={tw`text-2xl font-inter-bold px-5 mt-6`}>Popular Menu</Text>

        {/* TABS */}
        <View style={tw`flex-1 mt-3`}>
          <Tab.Navigator
            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarLabelStyle: {
                fontSize: 13,
                fontWeight: "700",
                textTransform: "none",
              },
              tabBarActiveTintColor: "#58C1F0",
              tabBarInactiveTintColor: "#999",
              tabBarIndicatorStyle: {
                backgroundColor: "#58C1F0",
                height: 3,
                borderRadius: 999,
              },
              tabBarStyle: {
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: "white",
              },
            }}
          >
            <Tab.Screen name="Related">
              {() => (
                <View style={tw`flex-1 bg-white`}>
                  <RelatedTab />
                </View>
              )}
            </Tab.Screen>

            <Tab.Screen name="All">
              {() => (
                <View style={tw`flex-1 bg-white`}>
                  <AllTab />
                </View>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      </View>
    </View>
  );
};

export default RestaurantDeepLinkScreen;
