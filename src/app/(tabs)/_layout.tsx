import { useSession } from "@/components/auth/ctx";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

export default function _layout() {
  const { session, isLoading } = useSession();

  if (!isLoading && !session) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <NativeTabs backgroundColor={"#fff"}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="orders">
        <NativeTabs.Trigger.Label>order</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="orders" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Icon sf="gear" md="search" />
        <NativeTabs.Trigger.Label>search</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.circle.fill" md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
