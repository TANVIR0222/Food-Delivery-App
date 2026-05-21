import PageWrapper from "@/components/PageWrapper";
import { useFavorites } from "@/context/FavoriteContext";
import tw from "@/lib/tailwind";
import { restaurantAllData } from "@/utils/all-dammy-data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
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
const RestaurantCard = ({ item }: any) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(item.id);

  const handleToggle = () => {
    const favoriteItem = {
      id: item.id,
      name: item.name,
      restaurantName: item.name,
      price: item.numericMinPrice || 450,
      rating: item.rating || 4.8,
      image: item.image,
    };
    toggleFavorite(favoriteItem);
    Alert.alert(
      isFav ? "Removed from Favorites" : "Added to Favorites",
      `${item.name} has been ${isFav ? "removed from" : "added to"} your favorites.`
    );
  };

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
          onPress={handleToggle}
          style={tw`absolute top-2 right-2 bg-white rounded-full p-1`}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={20}
            color={isFav ? "#ef4444" : "#9ca3af"}
          />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-black text-lg font-inter-bold`}>{item.name}</Text>

        <Text style={tw`text-text_gray text-sm mt-1`}>{item.description}</Text>

        <Text style={tw`text-text_gray text-xs mt-2`}>
          {getRestaurantCategory(item)} • {item.distanceKm} Km •{" "}
          {item.deliveryTimeMins} min
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// ---------------- CATEGORY SCREEN ----------------
const CategoryScreen = ({ category, data, searchText }: any) => {
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
        <RestaurantCard item={item} />
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

  return (
    <View style={tw`flex-1 pt-[${top}px] bg-white`}>
      <PageWrapper>
        {/* ---------------- SEARCH BAR ---------------- */}
        <View
          style={tw`flex-row items-center bg-description2/10 px-3 py-2 rounded-2xl mb-3`}
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
              // marginBottom: 20
            },
          }}
        >
          <Tab.Screen name="All">
            {() => (
              <View style={tw`flex-1 bg-white`}>
                <CategoryScreen
                  category="All"
                  data={data}
                  searchText={searchText}
                />
              </View>
            )}
          </Tab.Screen>

          <Tab.Screen name="Burgers">
            {() => (
              <View style={tw`flex-1 bg-white`}>
                <CategoryScreen
                  category="Burgers"
                  data={data}
                  searchText={searchText}
                />
              </View>
            )}
          </Tab.Screen>

          <Tab.Screen name="Pizza">
            {() => (
              <View style={tw`flex-1 bg-white`}>
                <CategoryScreen
                  category="Pizza"
                  data={data}
                  searchText={searchText}
                />
              </View>
            )}
          </Tab.Screen>

          <Tab.Screen name="Seafood">
            {() => (
              <View style={tw`flex-1 bg-white`}>
                <CategoryScreen
                  category="Seafood"
                  data={data}
                  searchText={searchText}
                />
              </View>
            )}
          </Tab.Screen>

          <Tab.Screen name="Desserts">
            {() => (
              <View style={tw`flex-1 bg-white`}>
                <CategoryScreen
                  category="Desserts"
                  data={data}
                  searchText={searchText}
                />
              </View>
            )}
          </Tab.Screen>

          <Tab.Screen name="Healthy">
            {() => (
              <View style={tw`flex-1 bg-white`}>
                <CategoryScreen
                  category="Healthy Food"
                  data={data}
                  searchText={searchText}
                />
              </View>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </PageWrapper>
    </View>
  );
}
