import { useSession } from "@/components/auth/ctx";
import PageWrapper from "@/components/PageWrapper";
import tw from "@/lib/tailwind";
import { router } from "expo-router";

import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const { signOut } = useSession();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Handle account deletion logic here
          },
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            signOut();
            // router.replace("/splash-screen");
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };

  return (
    <PageWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={tw`flex-1 flex-col gap-7 justify-center`}>
          {/* Static Header Section */}
          <View style={tw`flex-col items-center justify-center gap-4`}>
            <View style={tw`flex-row items-center justify-center`}>
              <View
                style={tw`flex-row items-center border border-[#E2E7F1] p-1 border-opacity-50 rounded-full`}
              >
                <Image
                  source={require("@/assets/all-dammy-image/profile-image.png")}
                  style={tw`w-16 h-16 rounded-full`}
                />
              </View>
            </View>
            <View>
              <Text style={tw`text-xl font-sfpro-600 text-black text-center`}>
                Tanvir
              </Text>
              {/* <Text
                style={tw`text-text14 font-sfpro-500 text-black text-center`}
              >
                {data?.data?.email}
              </Text> */}
            </View>
          </View>

          <View style={tw`flex-col gap-4`}>
            {/* Static Privacy & Security Section */}
            <View style={tw`mb-16`}>
              <Text style={tw`text-text18 font-sfpro-600 text-headingText`}>
                Privacy & Security
              </Text>

              {/* Privacy Policy */}
              <TouchableOpacity
                // onPress={() => router.push("/(common)/privacy-policy")}
                style={tw`flex-row items-center justify-between border border-border border-opacity-50 py-3 px-5 rounded-full mt-4`}
              >
                <Text style={tw`text-black text-text14 font-sfpro-600`}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>

              {/* Terms and Conditions */}
              <TouchableOpacity
                // onPress={() => router.push("/(common)/terms-and-conditions")}
                style={tw`flex-row items-center justify-between border border-border border-opacity-50 py-3 px-5 rounded-full mt-4`}
              >
                <Text style={tw`text-black text-text14 font-sfpro-600`}>
                  Terms and Conditions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => router.push("/(common)")}
                style={tw`flex-row items-center justify-between border border-border border-opacity-50 py-3 px-5 rounded-full mt-4`}
              >
                <Text style={tw`text-black text-text14 font-sfpro-600`}>
                  FAQ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/favorate")}
                style={tw`flex-row items-center justify-between border border-border border-opacity-50 py-3 px-5 rounded-full mt-4`}
              >
                <Text style={tw`text-black text-text14 font-sfpro-600`}>
                  favorate
                </Text>
              </TouchableOpacity>

              {/* Delete Account */}
              <TouchableOpacity
                style={tw`flex-row items-center justify-between border border-border border-opacity-50 py-3 px-5 rounded-full mt-4`}
              >
                <Text style={tw`text-black text-text14 font-sfpro-600`}>
                  Support
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-row items-center justify-between border border-border border-opacity-50 py-3 px-5 rounded-full mt-4`}
              // onPress={() => handleDeleteAccount()}
              >
                <Text style={tw`text-black text-text14 font-sfpro-600`}>
                  Delete Account
                </Text>
              </TouchableOpacity>

              {/* Log Out */}
              <TouchableOpacity
                onPress={() => handleLogout()}
                style={tw`flex-row items-center justify-between border border-border border-opacity-50 py-3 px-5 rounded-full mt-4`}
              >
                <Text style={tw`text-red-600 text-text14 font-sfpro-600`}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </PageWrapper>
  );
}
