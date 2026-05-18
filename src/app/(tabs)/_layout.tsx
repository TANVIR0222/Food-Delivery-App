import { Stack, Redirect } from "expo-router";
import React from "react";
import { useSession } from "@/components/auth/ctx";

export default function _layout() {
  const { session, isLoading } = useSession();

  if (!isLoading && !session) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
