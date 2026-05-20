import PageWrapper from "@/components/PageWrapper";
import { useCart } from "@/context/CartContext";
import tw from "@/lib/tailwind";
import { restaurantAllData } from "@/utils/all-dammy-data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

// ---------------- CATEGORY DETECTOR ----------------
const getRestaurantCategory = (item: any) => {
  const name = item.name.toLowerCase();

  if (name.includes("burger")) return "Burgers";
  if (name.includes("pizza")) return "Pizza";
  if (name.includes("dessert")) return "Desserts";
  if (name.includes("sweet")) return "Desserts";
  if (name.includes("healthy") || name.includes("fit")) return "Healthy Food";
  if (name.includes("sea")) return "Seafood";

  return "Other";
};

// ---------------- CARD ----------------
const RestaurantCard = ({ item, onToggleHeart }: any) => {
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
      activeOpacity={0.85}
      style={tw`flex-row bg-description2/10 rounded-3xl p-3 mb-4`}
    >
      <View style={tw`relative`}>
        <Image
          source={item.image}
          style={tw`w-30 h-30 rounded-2xl`}
          resizeMode="cover"
        />

        <TouchableOpacity
          onPress={() => onToggleHeart(item.id)}
          style={tw`absolute top-2 right-2 bg-white rounded-full p-1`}
        >
          <Ionicons
            name={item.hasHeart ? "heart" : "heart-outline"}
            size={20}
            color={item.hasHeart ? "#ef4444" : "#9ca3af"}
          />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-black text-lg font-bold`}>{item.name}</Text>

        <Text style={tw`text-gray-500 text-sm mt-1`}>{item.description}</Text>

        <Text style={tw`text-gray-700 text-xs mt-2`}>
          {getRestaurantCategory(item)} • {item.distanceKm} Km •{" "}
          {item.deliveryTimeMins} min
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// ---------------- CATEGORY SCREEN ----------------
const CategoryScreen = ({ category, data, searchText, toggleHeart }: any) => {
  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      const itemCategory = getRestaurantCategory(item);

      const matchCategory = category === "All" || itemCategory === category;

      const matchSearch = item.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [data, category, searchText]);

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RestaurantCard item={item} onToggleHeart={toggleHeart} />
      )}
      contentContainerStyle={tw`pb-20`}
      showsVerticalScrollIndicator={false}
    />
  );
};

// ---------------- MAIN SCREEN ----------------
export default function RestaurantListScreen() {
  const [data, setData] = useState(restaurantAllData);
  const [searchText, setSearchText] = useState("");
  const { top } = useSafeAreaInsets();
  const { addToCart, removeFromCart } = useCart();

  // ---------------- HEART TOGGLE ----------------
  const toggleHeart = (id: string) => {
    const updated = data.map((item) =>
      item.id === id ? { ...item, hasHeart: !item.hasHeart } : item,
    );

    setData(updated);

    const restaurant = data.find((i) => i.id === id);

    if (restaurant) {
      if (!restaurant.hasHeart) {
        addToCart({
          id: restaurant.id,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          name: restaurant.name,
          price: restaurant.numericMinPrice,
          image: restaurant.image,
          quantity: 1,
        });
      } else {
        removeFromCart(id);
      }
    }
  };

  return (
    <View style={tw`flex-1 pt-[${top}px] bg-white`}>
      <PageWrapper>
        {/* ---------------- SEARCH BAR ---------------- */}
        <View
          style={tw`flex-row items-center bg-slate-200 px-3 py-2 rounded-2xl mb-3`}
        >
          <Ionicons name="search" size={18} color="#9ca3af" />
          <TextInput
            placeholder="Search restaurants..."
            value={searchText}
            onChangeText={setSearchText}
            style={tw`flex-1 ml-2 text-black`}
          />
        </View>

        {/* ---------------- TABS ---------------- */}
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarLabelStyle: {
              fontSize: 13,
              fontWeight: "700",
              textTransform: "none",
            },
            tabBarIndicatorStyle: {
              backgroundColor: "#58C1F0",
              height: 3,
            },
            tabBarActiveTintColor: "#58C1F0",
            tabBarInactiveTintColor: "#9ca3af",
            tabBarStyle: {
              backgroundColor: "white",
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        >
          <Tab.Screen name="All">
            {() => (
              <CategoryScreen
                category="All"
                data={data}
                searchText={searchText}
                toggleHeart={toggleHeart}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Burgers">
            {() => (
              <CategoryScreen
                category="Burgers"
                data={data}
                searchText={searchText}
                toggleHeart={toggleHeart}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Pizza">
            {() => (
              <CategoryScreen
                category="Pizza"
                data={data}
                searchText={searchText}
                toggleHeart={toggleHeart}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Seafood">
            {() => (
              <CategoryScreen
                category="Seafood"
                data={data}
                searchText={searchText}
                toggleHeart={toggleHeart}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Desserts">
            {() => (
              <CategoryScreen
                category="Desserts"
                data={data}
                searchText={searchText}
                toggleHeart={toggleHeart}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Healthy">
            {() => (
              <CategoryScreen
                category="Healthy Food"
                data={data}
                searchText={searchText}
                toggleHeart={toggleHeart}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </PageWrapper>
    </View>
  );
}
