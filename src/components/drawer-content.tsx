import tw from "@/lib/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSession } from "./auth/ctx";

export default function CustomDrawerContent() {
  const { signOut } = useSession();

  return (
    <View style={tw`flex-1 bg-white pt-12 px-4`}>
      {/* User Avatar & Name */}
      <View style={tw`flex-row items-center gap-3 pb-6 border-b border-stroke`}>
        <Image
          source={require("@/assets/all-dammy-image/profile-image.png")}
          style={tw`w-14 h-14 rounded-full`}
        />
        <View>
          <Text style={tw`text-lg font-inter-bold text-title`}>Tanvir</Text>
          <Text style={tw`text-sm font-inter-regular text-text_gray`}>
            tanvir@email.com
          </Text>
        </View>
      </View>

      {/* Drawer Items */}
      <View style={tw`mt-4`}>
        <TouchableOpacity
          onPress={() => router.push("/(drawer)/(tabs)")}
          style={tw`flex-row items-center py-4`}
        >
          <Ionicons name="home-outline" size={22} color="#333" />
          <Text style={tw`ml-4 text-base font-inter-medium text-title`}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(drawer)/(tabs)/orders")}
          style={tw`flex-row items-center py-4`}
        >
          <Ionicons name="cart-sharp" size={22} color="#333" />
          <Text style={tw`ml-4 text-base font-inter-medium text-title`}>
            My Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(drawer)/(tabs)/profile")}
          style={tw`flex-row items-center py-4`}
        >
          <Ionicons name="settings-outline" size={22} color="#333" />
          <Text style={tw`ml-4 text-base font-inter-medium text-title`}>
            Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(drawer)/(tabs)/profile")}
          style={tw`flex-row items-center py-4`}
        >
          <Ionicons name="help-circle-outline" size={22} color="#333" />
          <Text style={tw`ml-4 text-base font-inter-medium text-title`}>
            Help
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1`} />

      {/* Logout */}
      <TouchableOpacity
        onPress={() => signOut()}
        style={tw`flex-row items-center py-4 border-t border-stroke mb-8`}
      >
        <Ionicons name="log-out-outline" size={22} color="red" />
        <Text style={tw`ml-4 text-base text-red-500 font-inter-semibold`}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
