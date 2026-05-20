import { IconsSearch, IconsSearchImage } from "@/assets/Icons";
import tw from "@/lib/tailwind";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

export default function HomeTopBar() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={tw`bg-secondary relative rounded-b-3xl h-[25%] pt-[${top / 2}px]`}
    >
      <StatusBar style="dark" />
      <View style={tw`flex-row items-center mt-[5%] justify-between p-4`}>
        <View style={tw` flex-row items-center gap-3`}>
          <Image
            source={require("@/assets/all-dammy-image/profile-image.png")}
          />
          <View style={tw` flex-col  items-start`}>
            <Text style={tw`text-sm font-inter-medium text-description3`}>
              Welcome back Shahid
            </Text>
            <Text style={tw`text-xs font-inter-regular text-description`}>
              Dhaka, Bangladesh
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={tw` relative z-50 `}
        >
          <MaterialIcons name="menu-open" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={tw` mx-3 z-50 flex-row items-center gap-2 bg-white p-3 rounded-full`}
        onPress={() => router.push("/(drawer)/(tabs)/search")}
      >
        <SvgXml xml={IconsSearch} />
        <Text>Search...</Text>
      </TouchableOpacity>
      {/* -translate-x-1/2 -translate-y-1/2 */}
      <View style={tw`absolute top-[${top}px] right-0  `}>
        <SvgXml xml={IconsSearchImage} />
      </View>
    </View>
  );
}
