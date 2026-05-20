import GlobalTopBar from "@/components/GlobalTopBar";
import tw from "@/lib/tailwind";
import { foodCategory } from "@/utils/all-dammy-data";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const CategoryCard = ({ item }: any) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/top-category/category",
          params: {
            type: item?.title,
          },
        })
      }
      activeOpacity={0.8}
      style={tw`flex-1 m-2 h-40 rounded-2xl overflow-hidden`}
    >
      <Image source={item.image} style={tw`w-full h-full`} resizeMode="cover" />

      {/* overlay */}
      <View
        style={[
          tw`absolute bottom-0 w-full px-3 py-3`,
          {
            experimental_backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.1) 100%)`,
          },
        ]}
      >
        <Text style={tw`text-white text-base font-bold`}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function CategoriesScreen() {
  return (
    <View style={tw`flex-1 bg-white px-2 pt-4`}>
      <GlobalTopBar title="All Categories" />
      {/* HEADER */}
      {/* <Text style={tw`text-2xl font-bold px-2 mb-3`}>All Categories</Text> */}

      {/* GRID LIST */}
      <FlatList
        data={foodCategory}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={tw`justify-between`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-10`}
        renderItem={({ item }) => <CategoryCard item={item} />}
      />
    </View>
  );
}
