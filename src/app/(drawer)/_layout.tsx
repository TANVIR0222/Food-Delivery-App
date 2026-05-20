import CustomDrawerContent from "@/components/drawer-content";
import tw from "@/lib/tailwind";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#FF6B00",
        drawerPosition: "right",

        drawerLabelStyle: tw`text-base -ml-2 bg-black`, // Using tailwind directly
        drawerActiveBackgroundColor: "#000000",
      }}
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
    >
      {/* <Drawer.Screen name="index" /> */}
    </Drawer>
  );
}
