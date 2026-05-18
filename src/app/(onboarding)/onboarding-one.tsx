import MainButton from "@/components/MainButton";
import PageWrapper from "@/components/PageWrapper";
import tw from "@/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

export default function onboardingOne() {
  return (
    <PageWrapper>
      <View style={tw`flex-1 flex-col gap-6 items-center justify-center`}>
        <Image
          style={tw`w-62 h-62`}
          source={require("@/assets/all-dammy-image/image-one.png")}
        />
        <View style={tw`flex-col gap-4`}>
          <Text style={tw`text-2xl font-inter-bold text-primary text-center`}>
            Craving Something Delicious?
          </Text>

          <Text style={tw`text-sm font-inter-medium text-gray text-center`}>
            Explore a wide variety of cuisines and find your favorite meals from
            top-rated local restaurants.
          </Text>
        </View>
      </View>
      <MainButton
        title="Get Started"
        onPress={() => router.push("/onboarding-two")}
      />
    </PageWrapper>
  );
}
