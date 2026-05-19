import { useSession } from "@/components/auth/ctx";
import AuthHeading from "@/components/AuthHeading";
import GlobalMainInput from "@/components/GlobalMainInput";
import KeyboardAvoidingWrapper from "@/components/KeyboardAvoidingComponent";
import MainButton from "@/components/MainButton";
import { ILoginPayload } from "@/interface/authInterface";
import tw from "@/lib/tailwind";
import { loginValidationSchema } from "@/schema/auth-validationSchema";
import generateDummyToken from "@/utils/generate-dummy-token";
import { save_token } from "@/utils/token-store";
import { _HEIGHT } from "@/utils/utils";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const LoginScreen = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const { top } = useSafeAreaInsets();
  const { signIn } = useSession();

  const handleLogin = async (data: ILoginPayload) => {
    const token = generateDummyToken(64);
    await save_token({ value: token });
    signIn();
    router.push("/(tabs)");
  };

  return (
    <KeyboardAvoidingWrapper>
      <View
        style={tw`flex-1 flex-col justify-between  pt-[${top}px]  bg-[#53B9E9]`}
      >
        <AuthHeading
          icon={true}
          title="Welcome Back"
          subtitle="It is quick and easy to log in. Enter your email and password below."
        />

        <View
          style={[
            tw`bg-white  rounded-t-[40px] px-[4%] pt-10`,
            { height: _HEIGHT * 0.65 },
          ]}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={tw`flex-col  justify-between `}>
                {/* 🔹 Input Fields */}
                <View style={tw` `}>
                  <GlobalMainInput
                    label="Email Address"
                    placeholder="Enter Your Email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={() => handleBlur("email")}
                    error={errors.email}
                    touched={touched.email}
                  />

                  <View>
                    <GlobalMainInput
                      label="Password"
                      placeholder="********"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={() => handleBlur("password")}
                      error={errors.password}
                      touched={touched.password}
                      isPassword
                    />
                  </View>
                </View>
                <View style={tw`flex-col gap-6`}>
                  {/* Options Row */}
                  <View style={tw`flex-row justify-between items-center `}>
                    <View style={tw`flex-row items-center`}>
                      <Checkbox
                        value={rememberMe}
                        onValueChange={setRememberMe}
                        color={rememberMe ? "#2D8CFF" : "#C4C4C4"}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 4,
                        }}
                      />

                      <Text style={tw`text-text_gray text-xs ml-2`}>
                        Remember me
                      </Text>
                    </View>
                  </View>

                  {/* Log In Button */}
                  <MainButton
                    title={false ? "Loading..." : "Log in"}
                    onPress={() => handleSubmit()}
                    disabled={false}
                    textStyle={tw`text-white`}
                    showSignUpLink={false}
                    signUpPrompt="Don’t have an account?"
                    signUpText="Register"
                    // onSignUpPress={() => router.push("/(auth)/register")}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default LoginScreen;
