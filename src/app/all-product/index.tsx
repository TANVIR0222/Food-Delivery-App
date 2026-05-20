import GlobalTopBar from "@/components/GlobalTopBar";
import PageWrapper from "@/components/PageWrapper";
import { restaurantAllData } from "@/utils/all-dammy-data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const RestaurantCard = ({ item }: any) => {
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
          style={tw`absolute top-4 right-4 bg-white p-2 rounded-full`}
        >
          <Ionicons
            name={item.hasHeart ? "heart" : "heart-outline"}
            size={20}
            color={item.hasHeart ? "red" : "black"}
          />
        </TouchableOpacity>

        {/* Delivery Time */}
        <View
          style={tw`absolute bottom-4 right-4 bg-black px-3 py-1 rounded-full`}
        >
          <Text style={tw`text-white text-xs font-bold`}>
            {item.deliveryTimeMins} min
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={tw`p-4`}>
        {/* Name + Rating */}
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-lg font-bold text-black`}>{item.name}</Text>

          <View style={tw`flex-row items-center`}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={tw`ml-1 text-sm font-semibold`}>{item.rating}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={tw`text-gray-500 mt-1 text-sm`}>{item.description}</Text>

        {/* Review + Distance */}
        <View style={tw`flex-row items-center mt-3`}>
          <Text style={tw`text-gray-700 text-sm`}>
            {item.reviewCount} reviews
          </Text>

          <View style={tw`w-1 h-1 bg-gray-400 rounded-full mx-2`} />

          <Text style={tw`text-gray-700 text-sm`}>{item.distanceKm} km</Text>
        </View>

        {/* Badges */}
        <View style={tw`flex-row flex-wrap mt-3`}>
          {item.badges.map((badge: string, index: number) => (
            <View
              key={index}
              style={tw`bg-orange-100 px-3 py-1 rounded-full mr-2 mb-2`}
            >
              <Text style={tw`text-orange-500 text-xs font-semibold`}>
                {badge}
              </Text>
            </View>
          ))}
        </View>

        {/* Price */}
        <View style={tw`flex-row items-center justify-between mt-2`}>
          <Text style={tw`text-base font-bold text-black`}>
            Starting from {item.minPrice}
          </Text>

          <TouchableOpacity style={tw`bg-black px-4 py-2 rounded-full`}>
            <Text style={tw`text-white text-sm font-semibold`}>
              Add to Cart
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
      <GlobalTopBar title="Back" />
      {/* Header */}
      <View style={tw`mb-5`}>
        <Text style={tw`text-3xl font-bold text-black`}>
          Popular Restaurants
        </Text>

        <Text style={tw`text-gray-500 mt-1`}>
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
