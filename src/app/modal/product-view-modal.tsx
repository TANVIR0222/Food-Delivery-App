import GlobalTopBar from "@/components/GlobalTopBar";
import { restaurantAllData } from "@/utils/all-dammy-data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const ProductViewScreen = () => {
  const { id } = useLocalSearchParams();

  const [isFavorite, setIsFavorite] = useState(false);

  // Find single product
  const product = restaurantAllData
    .flatMap((res) => res.menu)
    .find((item) => item.id === id);

  if (!product) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg font-bold`}>Product Not Found</Text>
      </View>
    );
  }

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
          onPress={() => setIsFavorite(!isFavorite)}
          style={tw`absolute top-14 right-4 bg-white p-2 rounded-full`}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={isFavorite ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={tw`px-5 pt-5`}>
        <Text style={tw`text-3xl font-bold`}>{product.title}</Text>

        <Text style={tw`text-orange-500 text-xl font-bold mt-2`}>
          {product.price}
        </Text>

        <Text style={tw`text-gray-500 mt-4 leading-5`}>
          This is a delicious food item made with premium ingredients. You can
          customize this description from your API later.
        </Text>

        {/* BUTTONS */}
        <View style={tw`mt-6 flex-row gap-3`}>
          <TouchableOpacity style={tw`flex-1 bg-black py-3 rounded-2xl`}>
            <Text style={tw`text-white text-center font-bold`}>
              Add to Cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`flex-1 bg-gray-200 py-3 rounded-2xl`}
          >
            <Text style={tw`text-center font-bold`}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductViewScreen;
