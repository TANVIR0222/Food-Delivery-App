import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SLIDER_ANIMATION = "slide_from_right";

export default function _layout() {
  return (
    <SafeAreaView style={styles.constainer}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          options={{
            animation: SLIDER_ANIMATION,
          }}
          name="onboarding-one"
        />
        <Stack.Screen
          options={{
            animation: SLIDER_ANIMATION,
          }}
          name="onboarding-two"
        />
        <Stack.Screen
          // options={{
          //   animation: SLIDER_ANIMATION,
          // }}
          name="onboarding-three"
        />
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
