import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "../lib/tailwind";

export default function NotFoundScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white px-6`}>
      <Ionicons name="alert-circle-outline" size={64} color="#888" />
      <Text style={tw`text-2xl font-extrabold  text-red mt-4`}>
        Page Not Found
      </Text>
      <Text style={tw`text-base  text-description mt-2 text-center`}>
        The page you're looking for doesn't exist or has been moved.
      </Text>

      <TouchableOpacity
        onPress={() => router.back()}
        style={tw`mt-6 bg-primary px-6 py-3 rounded-xl`}
      >
        <Text style={tw`text-white font-inter-semibold`}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}
