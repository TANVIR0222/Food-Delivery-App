import GlobalTopBar from "@/components/GlobalTopBar";
import { restaurantAllData } from "@/utils/all-dammy-data";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

// ---------------- MENU CARD ----------------
const MenuCard = ({ item }: any) => {
  console.log(item?.id);
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/food-details",
          params: {
            id: item.id,
          },
        })
      }
      activeOpacity={0.9}
      style={tw`flex-row items-center bg-gray-100 rounded-3xl p-3 mb-4 mx-4`}
    >
      <Image
        source={item.image}
        style={tw`w-20 h-20 rounded-2xl`}
        resizeMode="cover"
      />

      {/* CONTENT */}
      <View style={tw`flex-1 ml-4`}>
        {/* TITLE */}
        <Text style={tw`text-lg font-bold`}>{item.title}</Text>

        {/* PRICE */}
        <Text style={tw`text-orange-500 font-bold mt-1`}>{item.price}</Text>

        {/* RATING ROW */}
        <View style={tw`flex-row items-center mt-1`}>
          <Ionicons name="star" size={14} color="#F59E0B" />

          <Text style={tw`ml-1 text-gray-700 text-sm font-semibold`}>
            {item.rating ?? "4.5"}
          </Text>

          <Text style={tw`ml-2 text-gray-400 text-xs`}>
            ({item.reviews ?? "120"} reviews)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ---------------- PAGE ----------------
export default function CategoryProductScreen() {
  const { type } = useLocalSearchParams();

  // normalize
  const category = String(type).toLowerCase();

  // 🔥 filter restaurants by category
  const filteredRestaurants = useMemo(() => {
    return restaurantAllData.filter((res) => {
      const name = res.name.toLowerCase();

      if (category === "burgers") return name.includes("burger");
      if (category === "pizza") return name.includes("pizza");
      if (category === "seafood") return name.includes("sea");
      if (category === "desserts") return name.includes("dessert");
      if (category === "healthy")
        return name.includes("healthy") || name.includes("fit");

      return false;
    });
  }, [category]);

  // 🔥 flatten all menu
  const allMenus = useMemo(() => {
    return filteredRestaurants.flatMap((res) =>
      res.menu.map((m) => ({
        ...m,
        restaurantName: res.name,
      })),
    );
  }, [filteredRestaurants]);

  return (
    <View style={tw`flex-1 bg-white pt-12`}>
      {/* HEADER */}
      <View style={tw`flex-row items-center px-4 mb-3`}>
        <GlobalTopBar title={`Back`} />

        <Text style={tw`text-xl font-bold ml-3`}>{category.toUpperCase()}</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={allMenus}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuCard item={item} />}
        ListEmptyComponent={
          <View style={tw`flex-1 items-center mt-20`}>
            <Text style={tw`text-gray-500`}>No products found</Text>
          </View>
        }
      />
    </View>
  );
}
