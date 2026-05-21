import GlobalTopBar from "@/components/GlobalTopBar";
import PageWrapper from "@/components/PageWrapper";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoriteContext";
import tw from "@/lib/tailwind";
import { restaurantAllData } from "@/utils/all-dammy-data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const RestaurantCard = ({ item }: any) => {
  const { addToCart, cartItems } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const firstItem = item.menu?.[0];
  const isAdded = firstItem
    ? cartItems.some((cartItem) => cartItem.id === firstItem.id)
    : cartItems.some((cartItem) => cartItem.id === item.id);

  const isFav = isFavorite(item.id);

  const handleToggleFavorite = () => {
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
      activeOpacity={0.9}
      style={tw`bg-white mb-5 rounded-3xl overflow-hidden shadow-sm`}
    >
      {/* Restaurant Image */}
      <View style={tw`relative`}>
        <Image source={item.image} style={tw`w-full h-52`} resizeMode="cover" />

        {/* Heart Button */}
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={tw`absolute top-4 right-4 bg-white p-2 rounded-full`}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={20}
            color={isFav ? "red" : "black"}
          />
        </TouchableOpacity>

        {/* Delivery Time */}
        <View
          style={tw`absolute bottom-4 right-4 bg-black px-3 py-1 rounded-full`}
        >
          <Text style={tw`text-white text-xs font-inter-bold`}>
            {item.deliveryTimeMins} min
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={tw`p-4`}>
        {/* Name + Rating */}
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-lg font-inter-bold text-black`}>{item.name}</Text>

          <View style={tw`flex-row items-center`}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={tw`ml-1 text-sm font-inter-semibold`}>{item.rating}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={tw`text-text_gray mt-1 text-sm`}>{item.description}</Text>

        {/* Review + Distance */}
        <View style={tw`flex-row items-center mt-3`}>
          <Text style={tw`text-text_gray text-sm`}>
            {item.reviewCount} reviews
          </Text>

          <View style={tw`w-1 h-1 bg-gray rounded-full mx-2`} />

          <Text style={tw`text-text_gray text-sm`}>{item.distanceKm} km</Text>
        </View>

        {/* Badges */}
        <View style={tw`flex-row flex-wrap mt-3`}>
          {item.badges.map((badge: string, index: number) => (
            <View
              key={index}
              style={tw`bg-orange-100 px-3 py-1 rounded-full mr-2 mb-2`}
            >
              <Text style={tw`text-orange-500 text-xs font-inter-semibold`}>
                {badge}
              </Text>
            </View>
          ))}
        </View>

        {/* Price */}
        <View style={tw`flex-row items-center justify-between mt-2`}>
          <Text style={tw`text-base font-inter-bold text-black`}>
            Starting from {item.minPrice}
          </Text>

          <TouchableOpacity
            disabled={isAdded}
            onPress={() => {
              if (item.menu && item.menu[0]) {
                const firstItem = item.menu[0];
                addToCart({
                  id: firstItem.id,
                  restaurantId: item.id,
                  restaurantName: item.name,
                  name: firstItem.title,
                  price: firstItem.numericPrice,
                  image: firstItem.image,
                  quantity: 1,
                });
                Alert.alert("Success", `${firstItem.title} has been added to your cart.`);
              } else {
                addToCart({
                  id: item.id,
                  restaurantId: item.id,
                  restaurantName: item.name,
                  name: item.name,
                  price: item.numericMinPrice,
                  image: item.image,
                  quantity: 1,
                });
                Alert.alert("Success", `${item.name} has been added to your cart.`);
              }
            }}
            style={[
              tw`px-4 py-2 rounded-full`,
              isAdded ? tw`bg-gray` : tw`bg-black`
            ]}
          >
            <Text style={tw`text-white text-sm font-inter-semibold`}>
              {isAdded ? "Added" : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RestaurantScreen = () => {
  return (
    <PageWrapper>
      <View style={tw`mt-4`}>
        <GlobalTopBar title="Back" />
      </View>
      {/* Header */}
      <View style={tw`mb-5`}>
        <Text style={tw`text-3xl font-inter-bold text-black`}>
          Popular Restaurants
        </Text>

        <Text style={tw`text-text_gray mt-1`}>
          Discover the best food near you
        </Text>
      </View>

      {/* Restaurant List */}
      <FlatList
        data={restaurantAllData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-20`}
        renderItem={({ item }) => <RestaurantCard item={item} />}
      />
    </PageWrapper>
  );
};

export default RestaurantScreen;
