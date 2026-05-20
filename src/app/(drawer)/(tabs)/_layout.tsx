import { useSession } from "@/components/auth/ctx";
import { useCart } from "@/context/CartContext";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

export default function _layout() {
  const { session, isLoading } = useSession();
  const { cartItems } = useCart();

  if (!isLoading && !session) {
    return <Redirect href="/(auth)" />;
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <NativeTabs backgroundColor={"#fff"}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="orders">
        <NativeTabs.Trigger.Icon sf="cart.fill" md="shop" />

        {cartCount && (
          <NativeTabs.Trigger.Badge>
            {/* @ts-ignore */}
            {cartCount > 9 ? "9+" : cartCount}
          </NativeTabs.Trigger.Badge>
        )}

        <NativeTabs.Trigger.Label>Orders</NativeTabs.Trigger.Label>
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
