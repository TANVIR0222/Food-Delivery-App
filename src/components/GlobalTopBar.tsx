import { IconsBack } from "@/assets/Icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface AuthHeadingProps {
  icon?: boolean; // SVG XML string
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  titleStyle?: string; // Tailwind class string
  subtitleStyle?: string; // Tailwind class string
  containerStyle?: string; // Tailwind class string
  gap?: string; // Tailwind spacing class
  route?: () => void;
  addIiocns?: boolean;
  deleteICons?: boolean;
  threeDot?: boolean;
  id?: string | number;
  call?: boolean;
}

const GlobalTopBar: React.FC<AuthHeadingProps> = ({
  icon = IconsBack,
  onBack = () => router.back(),
  title = "",
}) => {
  return (
    <View style={tw` py-4 `}>
      {/* Back Button */}
      <TouchableOpacity
        style={tw` flex-row items-center gap-2`}
        onPress={onBack}
      >
        <SvgXml xml={IconsBack} />
        {/* Title */}
        <View style={tw``}>
          {title ? (
            <Text
              style={tw` text-2xl font-inter-semibold  text-heading_black_top`}
            >
              {title}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GlobalTopBar;
