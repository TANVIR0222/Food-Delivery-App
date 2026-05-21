import tw from "@/lib/tailwind";
import { homeCarousel } from "@/utils/all-dammy-data";
import { _WIDTH } from "@/utils/utils";
import * as React from "react";
import { Image, Text, View } from "react-native";
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useSharedValue,
} from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const HomeCarousel = () => {
  const ref = React.useRef<ICarouselInstance>(null);

  const progress = useSharedValue(0);
  const currentIndex = React.useRef(0);

  const onPressPagination = React.useCallback((index: number) => {
    const diff = index - currentIndex.current;

    ref.current?.scrollTo({
      count: diff,
      animated: true,
    });
  }, []);

  return (
    <View style={tw`items-center py-2`}>
      <Carousel
        ref={ref}
        loop
        width={_WIDTH * 0.91}
        height={165}
        data={homeCarousel}
        autoPlay
        autoPlayInterval={3000}
        scrollAnimationDuration={1000}
        pagingEnabled
        snapEnabled
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;

          runOnJS(() => {
            currentIndex.current =
              Math.round(absoluteProgress) % homeCarousel.length;
          })();
        }}
        renderItem={({ item }) => (
          <View style={tw`flex-1 justify-center flex-row p-1`}>
            <View style={tw` rounded-xl relative w-full h-40 overflow-hidden`}>
              <Image
                source={item?.image}
                style={{
                  width: _WIDTH,
                  height: _WIDTH * 0.91 * 0.6,
                }}
                resizeMode="stretch"
              />

              {/* <Image
                source={require("@/assets/all-dammy-image/image-banner-one.jpg")}
                style={tw`absolute h-42 right-0 bottom-0`}
                resizeMode="contain"
              /> */}

              <View
                style={[
                  tw`absolute  flex-col gap-2  p-2 bottom-0  w-full`,
                  {
                    experimental_backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.1) 100%)`,
                  },
                ]}
              >
                <Text
                  numberOfLines={2}
                  style={tw`font-inter-semibold text-white text-2xl z-50`}
                >
                  {item?.title}
                </Text>

                <Text style={tw`text-white text-2.5`}>{item?.des}</Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* Pagination */}
      <Pagination.Custom
        progress={progress}
        data={homeCarousel}
        size={10}
        horizontal
        onPress={onPressPagination}
        containerStyle={{
          gap: 6,
          marginTop: 12,
          alignItems: "center",
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 100,
          backgroundColor: "#58C1F0",
        }}
        activeDotStyle={{
          width: 28,
          height: 10,
          borderRadius: 100,
          backgroundColor: "#1C79BE",
        }}
        customReanimatedStyle={(value, index, length) => {
          let inputRange = [index - 1, index, index + 1];

          if (index === 0 && value > length - 1) {
            inputRange = [length - 1, length, length + 1];
          }

          const width = interpolate(
            value,
            inputRange,
            [10, 28, 10],
            Extrapolation.CLAMP,
          );

          const opacity = interpolate(
            value,
            inputRange,
            [0.5, 1, 0.5],
            Extrapolation.CLAMP,
          );

          return {
            width,
            opacity,
          };
        }}
      />
    </View>
  );
};

export default HomeCarousel;
