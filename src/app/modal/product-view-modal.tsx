import GlobalTopBar from "@/components/GlobalTopBar";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoriteContext";
import { restaurantAllData } from "@/utils/all-dammy-data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "@/lib/tailwind";

const ProductViewScreen = () => {
  const { id } = useLocalSearchParams();
  const { addToCart, cartItems } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Find single product
  const product = restaurantAllData
    .flatMap((res) => res.menu)
    .find((item) => item.id === id);

  if (!product) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg font-inter-bold`}>Product Not Found</Text>
      </View>
    );
  }

  const restaurant = restaurantAllData.find((res) =>
    res.menu.some((m) => m.id === id)
  );
  const restaurantName = restaurant ? restaurant.name : "Restaurant";
  const restaurantId = restaurant ? restaurant.id : "";

  const isAdded = cartItems.some((item) => item.id === product.id);
  const isFav = isFavorite(product.id);

  const handleToggleFavorite = () => {
    const favoriteItem = {
      id: product.id,
      name: product.title,
      restaurantName: restaurantName,
      price: product.numericPrice,
      rating: 4.8,
      image: product.image
    };
    toggleFavorite(favoriteItem);
    Alert.alert(
      isFav ? "Removed from Favorites" : "Added to Favorites",
      `${product.title} has been ${isFav ? "removed from" : "added to"} your favorites.`
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* IMAGE SECTION */}
      <View style={tw`relative`}>
        <Image
          source={product.image}
          style={tw`w-full h-80`}
          resizeMode="cover"
        />

        {/* BACK BUTTON */}
        <View style={tw`absolute top-14  left-4`}>
          <GlobalTopBar />
        </View>

        {/* ❤️ FAVORITE ICON */}
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={tw`absolute top-14 right-4 bg-white p-2 rounded-full`}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={22}
            color={isFav ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={tw`px-5 pt-5`}>
        <Text style={tw`text-3xl font-inter-bold`}>{product.title}</Text>

        <Text style={tw`text-orange-500 text-xl font-inter-bold mt-2`}>
          {product.price}
        </Text>

        <Text style={tw`text-text_gray mt-4 leading-5`}>
          This is a delicious food item made with premium ingredients. You can
          customize this description from your API later.
        </Text>

        {/* BUTTONS */}
        <View style={tw`mt-6 flex-row gap-3`}>
          <TouchableOpacity
            disabled={isAdded}
            onPress={() => {
              addToCart({
                id: product.id,
                restaurantId: restaurantId,
                restaurantName: restaurantName,
                name: product.title,
                price: product.numericPrice,
                image: product.image,
                quantity: 1,
              });
              Alert.alert("Success", `${product.title} has been added to your cart.`);
            }}
            style={[
              tw`flex-1 py-3 rounded-2xl`,
              isAdded ? tw`bg-gray` : tw`bg-black`
            ]}
          >
            <Text style={tw`text-white text-center font-inter-bold`}>
              {isAdded ? "Added to Cart" : "Add to Cart"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`flex-1 bg-stroke py-3 rounded-2xl`}
          >
            <Text style={tw`text-center font-inter-bold`}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductViewScreen;
