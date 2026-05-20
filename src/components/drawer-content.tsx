import tw from "@/lib/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSession } from "./auth/ctx";

export default function CustomDrawerContent() {
  const { signOut } = useSession();

  return (
    <View style={tw`flex-1 bg-white pt-5  px-4`}>
      <Text style={tw`text-2xl py-6 font-inter-bold text-primary`}>Food App</Text>


      <TouchableOpacity
        onPress={() => router.push("/(drawer)/(tabs)")}
        style={tw`flex-row items-center py-3`}
      >
        <Ionicons name="home-outline" size={22} color="#333" />
        <Text style={tw`ml-4 text-base text-text_gray`}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(drawer)/(tabs)/orders")}
        style={tw`flex-row items-center py-3`}
      >
        <Ionicons name="cart-outline" size={22} color="#333" />
        <Text style={tw`ml-4 text-base text-text_gray`}>Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(drawer)/(tabs)/search")}
        style={tw`flex-row items-center py-3`}
      >
        <Ionicons name="search-outline" size={22} color="#333" />
        <Text style={tw`ml-4 text-base text-text_gray`}>Search</Text>
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => router.push("/(drawer)/(tabs)/profile")}
        style={tw`flex-row items-center py-3`}
      >
        <Ionicons name="person-outline" size={22} color="#333" />
        <Text style={tw`ml-4 text-base text-text_gray`}>Profile</Text>
      </TouchableOpacity>

      <View style={tw`flex-1`} />

      {/*Logout */}
      <TouchableOpacity
        onPress={() => signOut()}
        style={tw`flex-row items-center py-4 border-t border-stroke mt-5`}
      >
        <Ionicons name="log-out-outline" size={22} color="red" />
        <Text style={tw`ml-4 text-base text-red-500 font-inter-semibold`}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
