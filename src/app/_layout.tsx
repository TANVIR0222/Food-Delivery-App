import { SessionProvider, useSession } from "@/components/auth/ctx";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Toaster } from "sonner-native";
import { useDeviceContext } from "twrnc";
import tw from "../lib/tailwind";

export default function RootLayout() {
  useDeviceContext(tw);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", () => {
      // handle orientation or screen size change
    });

    return () => {
      // unsubscribe properly
      subscription.remove();
    };
  }, []);

  const [loaded] = useFonts({
    // Inter fonts (separate naming)
    InterBlack: require("@/assets/fonts/Inter-fonts/Inter_28pt-Black.ttf"),
    InterBold: require("@/assets/fonts/Inter-fonts/Inter_28pt-Bold.ttf"),
    InterLight: require("@/assets/fonts/Inter-fonts/Inter_28pt-Light.ttf"),
    InterMedium: require("@/assets/fonts/Inter-fonts/Inter_28pt-Medium.ttf"),
    InterRegular: require("@/assets/fonts/Inter-fonts/Inter_28pt-Regular.ttf"),
    InterSemiBold: require("@/assets/fonts/Inter-fonts/Inter_28pt-SemiBold.ttf"),
    // Edu Fonts
    EduSemiBold: require("@/assets/fonts/edu-fonts/EduAUVICWANTGuides-SemiBold.ttf"),
    EduRegular: require("@/assets/fonts/edu-fonts/EduAUVICWANTGuides-Regular.ttf"),
    EduMedium: require("@/assets/fonts/edu-fonts/EduAUVICWANTGuides-Medium.ttf"),
    EduBold: require("@/assets/fonts/edu-fonts/EduAUVICWANTGuides-Bold.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SessionProvider>
      {/* <SplashScreenController /> */}
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* রুট স্ক্রিনসমূহ */}
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="common" />

        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />

        <Stack.Screen name="+not-found" />
      </Stack>

      <StatusBar style="dark" animated={true} />
      <Toaster />
    </GestureHandlerRootView>
  );
}
