import HomeCarousel from "@/components/home/home-carousel";
import HomeTopBar from "@/components/home/home-top-bar";
import HomeTopCategories from "@/components/home/home-top-categories";
import PageWrapper from "@/components/PageWrapper";
import tw from "@/lib/tailwind";
import { restaurantAllData } from "@/utils/all-dammy-data";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const RestaurantCard = ({ item }: any) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/food-details",
          params: {
            id: item.id,
          },
        })
      }
      activeOpacity={0.9}
      style={tw`bg-white flex-col gap-2`}
    >
      {/* IMAGE */}
      <Image
        source={item.image}
        style={tw`w-full h-52 rounded-3xl`}
        resizeMode="cover"
      />

      {/* CONTENT */}
      <View style={tw`flex-col gap-1`}>
        {/* NAME + RATING */}
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-title text-xl font-inter-medium`}>
            {item.name}
          </Text>

          <View style={tw`flex-row items-center gap-1`}>
            <Ionicons name="star" size={18} color="#FF9F0A" />

            <Text style={tw`text-title text-lg font-inter-medium`}>
              {item.rating}
            </Text>

            <Text style={tw`text-gray font-inter-regular text-lg`}>
              ({item.reviewCount})
            </Text>
          </View>
        </View>

        {/* DELIVERY INFO */}
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-gray font-inter-regular text-lg`}>
            {item.deliveryTimeMins} min
          </Text>

          <Text style={tw`text-gray mx-2`}>·</Text>

          <Text style={tw`text-gray font-inter-regular text-lg`}>
            ${item.numericMinPrice}
          </Text>

          <Text style={tw`text-gray mx-2`}>·</Text>

          <Text style={tw`text-gray font-inter-regular text-lg`}>
            {item.distanceKm} km
          </Text>
        </View>

        {/* OFFER (badge mapped) */}
        <View style={tw`flex-row items-center gap-2 flex-wrap`}>
          <MaterialCommunityIcons
            name="brightness-percent"
            size={18}
            color="#9CA3AF"
          />

          {/* show first badge */}
          <Text
            style={[
              tw`text-lg text-gray`,
              { textDecorationLine: "line-through" },
            ]}
          >
            {item.minPrice}
          </Text>

          {item.badges?.[0] && (
            <Text style={tw`text-pink-600 text-lg font-sfpro-600`}>
              {item.badges[0]}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default function App() {
  return (
    <View style={styles.container}>
      <HomeTopBar />

      <PageWrapper>
        <FlatList
          data={restaurantAllData}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw` pb-20 gap-4`}
          renderItem={({ item }) => <RestaurantCard item={item} />}
          ListHeaderComponent={
            <View style={tw`flex-col gap-3`}>
              <HomeCarousel />

              <HomeTopCategories />
              <View style={tw`flex-row items-center justify-between py-2`}>
                <Text style={tw`text-title text-xl font-inter-semibold`}>
                  Most Popular
                </Text>
                <TouchableOpacity onPress={() => router.push("/all-product")}>
                  <Text
                    style={tw`text-primary underline text-sm font-inter-semibold`}
                  >
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      </PageWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
