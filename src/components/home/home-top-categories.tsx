import tw from "@/lib/tailwind";
import { foodCategory } from "@/utils/all-dammy-data";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const FoodCard = ({ item }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={tw`bg-white relative w-40 h-40`}
    >
      <Image
        source={item.image}
        style={tw`w-full h-full rounded-2xl`}
        resizeMode="cover"
      />

      {/* Gradient Overlay */}
      <View
        style={[
          tw`absolute bottom-0 rounded-b-2xl w-full px-3 py-3`,
          {
            experimental_backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.1) 100%)`,
          },
        ]}
      >
        <Text style={tw`text-white text-sm font-inter-semibold`}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeTopCategories() {
  return (
    <View>
      <View style={tw`flex-row items-center justify-between`}>
        <Text style={tw`text-title text-xl font-inter-semibold`}>
          Top Categories
        </Text>
        <Text style={tw`text-primary underline text-sm font-inter-semibold`}>
          See all
        </Text>
      </View>

      <FlatList
        horizontal
        data={foodCategory}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw` gap-4 mt-4`}
        renderItem={({ item }) => <FoodCard item={item} />}
      />
    </View>
  );
}
