import { IconsClose } from "@/assets/Icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface FloatingInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: string;
  touched?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
}

const GlobalInput: React.FC<FloatingInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  keyboardType = "default",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, labelAnim]);

  const labelStyle = {
    position: "absolute" as const,
    left: 12,
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 3],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: touched && error ? "#EF4444" : "#999A9A", // red if error
    paddingHorizontal: 4,
  };

  return (
    <View style={tw`mb-3`}>
      <View
        style={tw.style(
          `flex-row items-center rounded-lg px-3`,
          touched && error
            ? "border-red-500 border rounded-xl"
            : isFocused
              ? "border-gray/30 border rounded-xl"
              : "bg-[#999A9A0D]",
        )}
      >
        <Animated.Text
          style={[tw`text-text12 font-sfpro-400 text-gray`, labelStyle]}
        >
          {label}
        </Animated.Text>
        <TextInput
          style={tw`flex-1 h-10 text-text12 font-sfpro-400 text-gray mt-3`}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={(event) => {
            setIsFocused(false);
            //@ts-ignore
            onBlur?.(event);
          }}
        />
        {value?.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText("")} style={tw`mr-2`}>
            <SvgXml xml={IconsClose} />
          </TouchableOpacity>
        )}
      </View>

      {/* Error message */}
      {/* {touched && error && (
                <Text style={tw`text-red-500 text-sm mt-1 ml-2`}>{error}</Text>
            )} */}
    </View>
  );
};

export default GlobalInput;
