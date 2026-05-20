import GlobalTopBar from "@/components/GlobalTopBar";
import PageWrapper from "@/components/PageWrapper";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoriteContext";
import tw from "@/lib/tailwind";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FavoriteScreen() {
  const { top } = useSafeAreaInsets();
  const { favoriteItems, removeFromFavorites } = useFavorites();
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      restaurantId: "res_01", // default/fallback
      restaurantName: item.restaurantName || "Restaurant",
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    Alert.alert("Added to Cart", `${item.name} has been added to your cart.`);
  };

  const renderFavoriteItem = ({ item }: any) => {
    const isAdded = cartItems.some((cartItem) => cartItem.id === item.id);

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={tw`bg-white rounded-3xl mb-4 overflow-hidden`}
      >
        {/* FOOD IMAGE */}
        <View style={tw`relative`}>
          <Image source={item.image} style={tw`w-full h-44`} resizeMode="cover" />

          {/* FAVORITE ICON */}
          <TouchableOpacity
            onPress={() => {
              removeFromFavorites(item.id);
              Alert.alert(
                "Removed from Favorites",
                `${item.name} has been removed from your favorites.`
              );
            }}
            style={tw`absolute top-3 right-3 bg-white w-10 h-10 rounded-full items-center justify-center`}
          >
            <Ionicons name="heart" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        <View style={tw`p-4`}>
          <View style={tw`flex-row justify-between items-start`}>
            <View style={tw`flex-1 pr-3`}>
              <Text style={tw`text-black text-lg font-inter-bold`}>{item.name}</Text>

              <Text style={tw`text-text_gray text-sm mt-1`}>
                {item.restaurantName}
              </Text>
            </View>

            <Text style={tw`text-primary text-lg font-inter-bold`}>$ {item.price}</Text>
          </View>

          {/* BOTTOM */}
          <View style={tw`flex-row items-center justify-between mt-4`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={tw`ml-1 text-text_gray font-inter-medium`}>
                {item.rating}
              </Text>
            </View>

            <TouchableOpacity
              disabled={isAdded}
              onPress={() => handleAddToCart(item)}
              style={tw`${isAdded ? "bg-gray" : "bg-black"
                } px-5 py-2 rounded-full flex-row items-center`}
            >
              <Ionicons name="cart-outline" size={16} color="white" />
              <Text style={tw`text-white font-inter-semibold ml-2`}>
                {isAdded ? "Added" : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (favoriteItems.length === 0) {
    return (
      <View
        style={tw`flex-1 bg-white items-center justify-center pt-[${top}px]`}
      >
        <Ionicons name="heart-outline" size={70} color="#d1d5db" />

        <Text style={tw`text-xl font-inter-bold text-text_gray mt-5`}>
          No Favorites Yet
        </Text>

        <Text style={tw`text-text_gray mt-2 text-center px-10`}>
          Save your favorite foods and restaurants to quickly order later.
        </Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white pt-[${top}px]`}>
      <PageWrapper>
        <GlobalTopBar title="Back" />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favoriteItems}
          keyExtractor={(item) => item.id}
          renderItem={renderFavoriteItem}
          contentContainerStyle={tw`pb-10`}
          ListHeaderComponent={
            <View style={tw`mb-5`}>
              <Text style={tw`text-3xl font-inter-bold text-black`}>Favorites</Text>

              <Text style={tw`text-text_gray mt-1`}>
                Your saved foods & restaurants
              </Text>
            </View>
          }
        />
      </PageWrapper>
    </View>
  );
}
