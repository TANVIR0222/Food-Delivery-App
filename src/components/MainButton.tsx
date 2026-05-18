import tw from "@/lib/tailwind";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";

interface MainButtonProps extends TouchableOpacityProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  showSignUpLink?: boolean;
  onSignUpPress?: () => void;
  signUpText?: string;
  signUpPrompt?: string;
  bm?: boolean;
  isLoading?: boolean;
}

const MainButton: React.FC<MainButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled = false,
  showSignUpLink = false,
  onSignUpPress,
  signUpText,
  signUpPrompt,
  bm,
  isLoading,
  ...props
}) => {
  return (
    <View style={tw`flex-col  gap-5 ${bm ? "pb-2" : "pb-2"} `}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          tw`bg-primary  p-4 rounded-full`,
          disabled && tw`bg-primary/50`,
          buttonStyle,
        ]}
        disabled={disabled}
        {...props}
      >
        <View style={tw`flex-row gap-2 items-center justify-center`}>
          {isLoading && <ActivityIndicator size="small" color="#fff" />}
          <Text
            style={[
              tw`text-white text-4 text-center font-inter-regular`,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>

      {showSignUpLink && (
        <View style={tw`flex-row items-center justify-center`}>
          <Text style={tw`text-gray text-text14`}>{signUpPrompt} </Text>
          <TouchableOpacity onPress={onSignUpPress}>
            <Text
              style={[
                tw` text-title text-sm underline font-geist-medium `,
                textStyle,
              ]}
            >
              {signUpText}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MainButton;
