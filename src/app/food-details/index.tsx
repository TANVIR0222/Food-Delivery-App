import GlobalTopBar from "@/components/GlobalTopBar";
import { restaurantAllData } from "@/utils/all-dammy-data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "@/lib/tailwind";

const Tab = createMaterialTopTabNavigator();

// ---------------- MENU CARD ----------------

const MenuCard = ({ item }: any) => {
  return (
    <View
      style={tw`flex-row items-center bg-stroke rounded-3xl p-3 mb-4 mx-4`}
    >
      <Image
        source={item.image}
        style={tw`w-24 h-24 rounded-2xl`}
        resizeMode="cover"
      />

      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-lg font-inter-bold`}>{item.title}</Text>

        <Text style={tw`text-orange-500 mt-2 font-inter-bold`}>{item.price}</Text>
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

const RestaurantDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const restaurant = restaurantAllData.find((item) => item.id === id);

  if (!restaurant) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Restaurant Not Found</Text>
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
        if (currentCategory === "burger") {
          return res.name.toLowerCase().includes("burger");
        }

        if (currentCategory === "pizza") {
          return res.name.toLowerCase().includes("pizza");
        }

        if (currentCategory === "dessert") {
          return (
            res.name.toLowerCase().includes("dessert") ||
            res.name.toLowerCase().includes("sweet")
          );
        }

        if (currentCategory === "healthy") {
          return (
            res.name.toLowerCase().includes("healthy") ||
            res.name.toLowerCase().includes("fit")
          );
        }

        if (currentCategory === "seafood") {
          return (
            res.name.toLowerCase().includes("sea") ||
            res.name.toLowerCase().includes("ocean")
          );
        }

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

  // ---------------- BURGER TAB ----------------

  const BurgerTab = () => {
    const filtered = restaurantAllData
      .flatMap((res) => res.menu)
      .filter((item: any) => item.title.toLowerCase().includes("burger"));

    return (
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuCard item={item} />}
        contentContainerStyle={tw`pb-10 pt-4`}
      />
    );
  };

  // ---------------- PIZZA TAB ----------------

  const PizzaTab = () => {
    const filtered = restaurantAllData
      .flatMap((res) => res.menu)
      .filter((item: any) => item.title.toLowerCase().includes("pizza"));

    return (
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuCard item={item} />}
        contentContainerStyle={tw`pb-10 pt-4`}
      />
    );
  };

  // ---------------- DESSERT TAB ----------------

  const DessertTab = () => {
    const filtered = restaurantAllData
      .flatMap((res) => res.menu)
      .filter(
        (item: any) =>
          item.title.toLowerCase().includes("cake") ||
          item.title.toLowerCase().includes("dessert") ||
          item.title.toLowerCase().includes("donut"),
      );

    return (
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuCard item={item} />}
        contentContainerStyle={tw`pb-10 pt-4`}
      />
    );
  };

  // ---------------- HEALTHY TAB ----------------

  const HealthyTab = () => {
    const filtered = restaurantAllData
      .flatMap((res) => res.menu)
      .filter(
        (item: any) =>
          item.title.toLowerCase().includes("salad") ||
          item.title.toLowerCase().includes("protein") ||
          item.title.toLowerCase().includes("smoothie") ||
          item.title.toLowerCase().includes("bowl"),
      );

    return (
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuCard item={item} />}
        contentContainerStyle={tw`pb-10 pt-4`}
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

        <View style={tw`absolute top-14  left-4`}>
          <GlobalTopBar />
        </View>
        {/* <TouchableOpacity
          onPress={() => router?.back()}
          style={tw`absolute top-14 left-4 bg-white p-2 rounded-full`}
        >
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity> */}
      </View>

      {/* SCROLLABLE AREA */}
      <View style={tw`flex-1`}>
        {/* CONTENT (name, rating etc) */}
        <View style={tw`px-5 pt-5`}>
          <Text style={tw`text-3xl font-inter-bold`}>{restaurant.name}</Text>

          <Text style={tw`text-text_gray mt-2`}>{restaurant.description}</Text>

          <View style={tw`flex-row items-center mt-4`}>
            <Ionicons name="star" size={18} color="#F59E0B" />
            <Text style={tw`ml-2 font-inter-semibold`}>{restaurant.rating}</Text>
            <Text style={tw`text-text_gray ml-2`}>
              ({restaurant.reviewCount} reviews)
            </Text>
          </View>
        </View>

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

              // ✅ RIGHT WAY TO CONTROL COLOR
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
            <Tab.Screen name="Related">{() => <RelatedTab />}</Tab.Screen>

            <Tab.Screen name="All">{() => <AllTab />}</Tab.Screen>
            <Tab.Screen name="Burger">{() => <BurgerTab />}</Tab.Screen>
            <Tab.Screen name="Pizza">{() => <PizzaTab />}</Tab.Screen>
            <Tab.Screen name="Desserts">{() => <DessertTab />}</Tab.Screen>
            <Tab.Screen name="Healthy">{() => <HealthyTab />}</Tab.Screen>
          </Tab.Navigator>
        </View>
      </View>
    </View>
  );
};

export default RestaurantDetailsScreen;
