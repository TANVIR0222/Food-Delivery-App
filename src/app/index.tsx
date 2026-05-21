import { useSession } from "@/components/auth/ctx";
import { router, SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import PageWrapper from "../components/PageWrapper";
// import { storage } from '../lib/mmkv-storage';
import tw from "../lib/tailwind";

SplashScreen.preventAutoHideAsync();

export default function MainScreen() {
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (isLoading) return;

    try {
      const timeout = setTimeout(() => {
        SplashScreen.hideAsync();
        if (session) {
          router?.replace("/(drawer)/(tabs)");
        } else {
          router?.replace("/(onboarding)/onboarding-one");
        }
      }, 800);

      return () => clearTimeout(timeout);
    } catch (e) {
      SplashScreen.hideAsync();
    }
  }, [session, isLoading]);

  return (
    <PageWrapper>
      <View style={tw`flex-1 flex-col gap-4 justify-center items-center`}>
        <Image
          // style={tw`w-32 h-32`}
          source={require("@/assets/pizza-ingrediants.gif")}
          resizeMode="cover"
        />
        <View style={tw`flex-col gap-4`}>
          <Text style={tw`text-2xl font-inter-bold text-primary text-center`}>
            Welcome to Foodie Express
          </Text>

          <Text style={tw`text-sm font-inter-medium text-gray text-center`}>
            Discover delicious meals, order from your favorite restaurants, and
            get food delivered to your doorstep fast and fresh anytime.
          </Text>
        </View>

        <View style={tw`absolute bottom-20`}>
          <ActivityIndicator size="large" color="#0087FF" />
        </View>
      </View>
    </PageWrapper>
  );
}
