import GlobalTopBar from "@/components/GlobalTopBar";
import MainButton from "@/components/MainButton";
import PageWrapper from "@/components/PageWrapper";
import tw from "@/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

export default function onboardingThree() {
  return (
    <PageWrapper>
      <GlobalTopBar title="Back" />
      <View style={tw`flex-1 flex-col gap-6 items-center justify-center`}>
        <Image
          style={tw`w-62 h-62`}
          source={require("@/assets/all-dammy-image/image-three.png")}
          resizeMode="contain"
        />
        <View style={tw`flex-col gap-4`}>
          <Text style={tw`text-2xl font-inter-bold text-primary text-center`}>
            Easy & Secure Ordering
          </Text>

          <Text style={tw`text-sm font-inter-medium text-gray text-center`}>
            Customize your cravings and pay securely with multiple payment
            options in just a few taps.
          </Text>
        </View>
      </View>
      <MainButton
        title="Get Started"
        onPress={() => router.push("/(auth)")}
        // onPress={() => router.push("/onboarding-three")}
      />
    </PageWrapper>
  );
}
