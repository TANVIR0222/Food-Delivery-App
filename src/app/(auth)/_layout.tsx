import { useSession } from "@/components/auth/ctx";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function AuthRootLayout() {
  const { session, isLoading } = useSession();

  if (!isLoading && session) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack>
      <StatusBar barStyle={"light-content"} />
    </>
  );
}
