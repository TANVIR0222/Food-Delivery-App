import PageWrapper from "@/components/PageWrapper";
import tw from "@/lib/tailwind";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ---------------- CATEGORY DATA ----------------
const foodCategory = [
  "Burgers",
  "Pizza",
  "Seafood",
  "Desserts",
  "Healthy Food",
];

// ---------------- RESTAURANT DATA ----------------
export const restaurantAllData = [
  {
    id: "res_01",
    name: "Bottega Restorante",
    category: "Pizza",
    description: "Italian restaurant with various dishes",
    rating: 4.6,
    reviewCount: 456,
    image: require("@/assets/all-dammy-image/burgers-01.jpg"),
    minPrice: "49rb",
    numericMinPrice: 49000,
    distanceKm: 4.6,
    deliveryTimeMins: 15,
    hasHeart: false,
    badges: ["Extra discount", "Free delivery"],
  },
  {
    id: "res_02",
    name: "SOULFOOD Jakarta",
    category: "Burgers",
    description: "Indonesian comfort eats served",
    rating: 4.7,
    reviewCount: 346,
    image: require("@/assets/all-dammy-image/pizza-01.jpg"),
    minPrice: "35rb",
    numericMinPrice: 35000,
    distanceKm: 3.2,
    deliveryTimeMins: 10,
    hasHeart: true,
    badges: ["Extra discount"],
  },
  {
    id: "res_03",
    name: "Greyhound Cafe",
    category: "Seafood",
    description: "Hip industrial-style eatery",
    rating: 4.2,
    reviewCount: 354,
    image: require("@/assets/all-dammy-image/seafood-01.jpg"),
    minPrice: "39rb",
    numericMinPrice: 39000,
    distanceKm: 2.6,
    deliveryTimeMins: 10,
    hasHeart: false,
    badges: ["Free delivery"],
  },
  {
    id: "res_012",
    name: "Bottega Restorante",
    category: "Pizza",
    description: "Italian restaurant with various dishes",
    rating: 4.6,
    reviewCount: 456,
    image: require("@/assets/all-dammy-image/burgers-01.jpg"),
    minPrice: "49rb",
    numericMinPrice: 49000,
    distanceKm: 4.6,
    deliveryTimeMins: 15,
    hasHeart: false,
    badges: ["Extra discount", "Free delivery"],
  },
  {
    id: "res_023",
    name: "SOULFOOD Jakarta",
    category: "Burgers",
    description: "Indonesian comfort eats served",
    rating: 4.7,
    reviewCount: 346,
    image: require("@/assets/all-dammy-image/pizza-01.jpg"),
    minPrice: "35rb",
    numericMinPrice: 35000,
    distanceKm: 3.2,
    deliveryTimeMins: 10,
    hasHeart: true,
    badges: ["Extra discount"],
  },
  {
    id: "res_034",
    name: "Greyhound Cafe",
    category: "Seafood",
    description: "Hip industrial-style eatery",
    rating: 4.2,
    reviewCount: 354,
    image: require("@/assets/all-dammy-image/seafood-01.jpg"),
    minPrice: "39rb",
    numericMinPrice: 39000,
    distanceKm: 2.6,
    deliveryTimeMins: 10,
    hasHeart: false,
    badges: ["Free delivery"],
  },
];

// ---------------- CARD ----------------
const RestaurantCard = ({ item }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={tw`flex-row bg-description2/10 rounded-3xl p-3 mb-4`}
    >
      <Image
        source={item.image}
        style={tw`w-30 h-30 rounded-2xl`}
        resizeMode="cover"
      />

      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-black text-lg font-bold`}>{item.name}</Text>

        <Text style={tw`text-gray-500 text-sm mt-1`}>{item.description}</Text>

        <Text style={tw`text-gray-700 text-xs mt-2`}>
          {item.category} • {item.distanceKm} Km • {item.deliveryTimeMins} min
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// ---------------- SCREEN ----------------
export default function RestaurantListScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const { top } = useSafeAreaInsets();

  const filteredData = useMemo(() => {
    return restaurantAllData.filter((item) => {
      const matchCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchSearch = item.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchText]);

  const renderHeader = () => (
    <View>
      {/* SEARCH */}
      <View
        style={tw`flex-row items-center bg-slate-200 px-3 py-2 rounded-2xl mb-3`}
      >
        <Ionicons name="search" size={18} color="#9ca3af" />
        <TextInput
          placeholder="Search restaurants..."
          value={searchText}
          onChangeText={setSearchText}
          style={tw`flex-1 ml-2 text-black`}
        />
      </View>

      {/* CATEGORY */}
      <FlatList
        horizontal
        data={["All", ...foodCategory]}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pb-3`}
        renderItem={({ item }) => {
          const active = selectedCategory === item;

          return (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              style={tw`mr-2 px-4 h-10 justify-center items-center rounded-full ${
                active ? "bg-primary" : "bg-[#9ca3af]"
              }`}
            >
              <Text style={tw`${active ? "text-white" : "text-black"}`}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  return (
    <View style={tw`flex-1 pt-[${top}px] bg-white `}>
      <PageWrapper>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RestaurantCard item={item} />}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-20`}
        />
      </PageWrapper>
    </View>
  );
}

//**
// // import PageWrapper from "@/components/PageWrapper";
// import tw from "@/lib/tailwind";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import React, { useMemo, useState } from "react";
// import {
//   FlatList,
//   Image,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// // ---------------- CATEGORY DATA ----------------
// const foodCategory = ["Burgers", "Pizza", "Seafood", "Desserts", "Healthy Food"];

// // ---------------- RESTAURANT DATA (cleaned) ----------------
// export const restaurantAllData = [
//   {
//     id: "res_01",
//     name: "Bottega Restorante",
//     category: "Pizza",
//     description: "Italian restaurant with various dishes",
//     rating: 4.6,
//     reviewCount: 456,
//     image: require("@/assets/all-dammy-image/burgers-01.jpg"),
//     distanceKm: 4.6,
//     deliveryTimeMins: 15,
//     hasHeart: false,
//   },
//   {
//     id: "res_02",
//     name: "SOULFOOD Jakarta",
//     category: "Burgers",
//     description: "Indonesian comfort eats served",
//     rating: 4.7,
//     reviewCount: 346,
//     image: require("@/assets/all-dammy-image/pizza-01.jpg"),
//     distanceKm: 3.2,
//     deliveryTimeMins: 10,
//     hasHeart: true,
//   },
//   {
//     id: "res_03",
//     name: "Greyhound Cafe",
//     category: "Seafood",
//     description: "Hip industrial-style eatery",
//     rating: 4.2,
//     reviewCount: 354,
//     image: require("@/assets/all-dammy-image/seafood-01.jpg"),
//     distanceKm: 2.6,
//     deliveryTimeMins: 10,
//     hasHeart: false,
//   },
// ];

// // ---------------- CARD ----------------
// const RestaurantCard = ({ item, onToggleHeart }: any) => {
//   return (
//     <TouchableOpacity
//       activeOpacity={0.85}
//       style={tw`flex-row bg-white rounded-3xl p-3 mb-4`}
//     >
//       {/* IMAGE WRAPPER */}
//       <View style={tw`relative`}>
//         <Image
//           source={item.image}
//           style={tw`w-30 h-30 rounded-2xl`}
//           resizeMode="cover"
//         />

//         {/* HEART ICON */}
//         <TouchableOpacity
//           onPress={() => onToggleHeart(item.id)}
//           style={tw`absolute top-2 right-2 bg-white rounded-full p-1`}
//         >
//           <Ionicons
//             name={item.hasHeart ? "heart" : "heart-outline"}
//             size={18}
//             color={item.hasHeart ? "red" : "#9ca3af"}
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={tw`flex-1 ml-4`}>
//         <Text style={tw`text-black text-lg font-bold`}>{item.name}</Text>

//         <Text style={tw`text-gray-500 text-sm mt-1`}>
//           {item.description}
//         </Text>

//         <Text style={tw`text-gray-700 text-xs mt-2`}>
//           {item.category} • {item.distanceKm} Km • {item.deliveryTimeMins} min
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// // ---------------- SCREEN ----------------
// export default function RestaurantListScreen() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchText, setSearchText] = useState("");
//   const [data, setData] = useState(restaurantAllData);

//   // ---------------- HEART TOGGLE ----------------
//   const toggleHeart = (id: string) => {
//     const updated = data.map((item) =>
//       item.id === id ? { ...item, hasHeart: !item.hasHeart } : item
//     );
//     setData(updated);
//   };

//   // ---------------- FILTER ----------------
//   const filteredData = useMemo(() => {
//     return data.filter((item) => {
//       const matchCategory =
//         selectedCategory === "All" || item.category === selectedCategory;

//       const matchSearch = item.name
//         .toLowerCase()
//         .includes(searchText.toLowerCase());

//       return matchCategory && matchSearch;
//     });
//   }, [selectedCategory, searchText, data]);

//   return (
//     <SafeAreaView style={tw`flex-1`}>
//       <PageWrapper>
//         {/* SEARCH */}
//         <View style={tw`flex-row items-center bg-white px-3 py-2 rounded-2xl mb-3`}>
//           <Ionicons name="search" size={18} color="#9ca3af" />
//           <TextInput
//             placeholder="Search restaurants..."
//             value={searchText}
//             onChangeText={setSearchText}
//             style={tw`flex-1 ml-2`}
//           />
//         </View>

//         {/* CATEGORY */}
//         <FlatList
//           horizontal
//           data={["All", ...foodCategory]}
//           keyExtractor={(item) => item}
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item }) => {
//             const active = selectedCategory === item;

//             return (
//               <TouchableOpacity
//                 onPress={() => setSelectedCategory(item)}
//                 style={tw`mr-2 h-10 w-20 justify-center items-center rounded-full ${
//                   active ? "bg-primary" : "bg-white"
//                 }`}
//               >
//                 <Text style={tw`${active ? "text-white" : "text-black"}`}>
//                   {item}
//                 </Text>
//               </TouchableOpacity>
//             );
//           }}
//         />

//         {/* LIST */}
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <RestaurantCard item={item} onToggleHeart={toggleHeart} />
//           )}
//           showsVerticalScrollIndicator={false}
//         />
//       </PageWrapper>
//     </SafeAreaView>
//   );
// }*/
