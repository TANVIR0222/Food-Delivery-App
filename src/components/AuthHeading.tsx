import { IconsBack } from "@/assets/Icons";
import tw from "@/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface AuthHeadingProps {
  icon: boolean; // SVG XML string
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  titleStyle?: string; // Tailwind class string
  subtitleStyle?: string; // Tailwind class string
  containerStyle?: string; // Tailwind class string
  gap?: string; // Tailwind spacing class
}

const AuthHeading: React.FC<AuthHeadingProps> = ({
  icon,
  onBack = () => router.back(),
  title = "",
  subtitle = "",
  //   titleStyle = "text-lg font-inter-regular text-primary_black",
  titleStyle = "text-4xl font-inter-semibold  text-title",
  subtitleStyle = "text-description font-inter-regular text-description text-4",
  containerStyle = "pb-3.5 px-[4%]",
  gap = "gap-2.5",
}) => {
  return (
    <View style={tw`${containerStyle}`}>
      {icon && (
        <TouchableOpacity
          style={tw`py-6 flex-row  items-center text-lg gap-2`}
          onPress={onBack}
        >
          <SvgXml xml={IconsBack} />
          <Text style={tw`text-lg font-inter-regular text-primary_black"`}>
            Back
          </Text>
        </TouchableOpacity>
      )}

      <View style={tw`flex-col ${gap}`}>
        {title ? <Text style={tw`${titleStyle}`}>{title}</Text> : null}
        {subtitle ? <Text style={tw`${subtitleStyle}`}>{subtitle}</Text> : null}
      </View>
    </View>
  );
};

export default AuthHeading;
