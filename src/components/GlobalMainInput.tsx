import { IconsCloseEyse, IconsEyse } from "@/assets/Icons";
import React from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";

interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  labelStyle?: object;
  textInputStyle?: object;
  isPassword?: boolean;
}

const GlobalMainInput: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  keyboardType = "default",
  labelStyle,
  textInputStyle,
  isPassword = false,
}) => {
  const [secureText, setSecureText] = React.useState(isPassword);
  const showError = touched && !!error;

  return (
    <View style={tw`gap-2 ${showError ? "pb-2" : "pb-4"}`}>
      {/* Label */}
      <Text
        style={tw.style(
          `text-text_gray font-inter-regular text-sm`,
          labelStyle,
        )}
      >
        {label}
      </Text>

      {/* Input Wrapper */}
      <View
        style={tw.style(
          `flex-row items-center h-12 border rounded-full px-4 bg-white`,
          showError ? "border-red" : "border-stroke",
        )}
      >
        {/* TextInput */}
        <TextInput
          style={tw.style(`flex-1 text-base text-black`, textInputStyle)}
          placeholder={placeholder}
          placeholderTextColor="#A2A2A2"
          keyboardType={keyboardType}
          secureTextEntry={isPassword && secureText}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />

        {/* Right Icon Section */}
        {isPassword ? (
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={tw`ml-2`}
          >
            <SvgXml xml={secureText ? IconsCloseEyse : IconsEyse} />
          </TouchableOpacity>
        ) : (
          value?.length > 0 && (
            <TouchableOpacity onPress={() => onChangeText("")} style={tw`ml-2`}>
              <Text style={tw`text-gray text-xs`}>✕</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Error Message */}
      {showError && (
        <Text style={tw`text-red font-sfProLight text-xs ml-2`}>{error}</Text>
      )}
    </View>
  );
};

export default GlobalMainInput;
