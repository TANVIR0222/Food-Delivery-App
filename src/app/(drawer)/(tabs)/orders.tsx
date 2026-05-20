import PageWrapper from "@/components/PageWrapper";
import { useCart } from "@/context/CartContext";
import tw from "@/lib/tailwind";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OrdersScreen() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { top } = useSafeAreaInsets();

  const renderOrderItem = ({ item }: any) => (
    <View style={tw`flex-row bg-white rounded-2xl p-4 mb-4 items-center gap-3`}>
      <Image
        source={item.image}
        style={tw`w-20 h-20 rounded-xl`}
        resizeMode="cover"
      />

      <View style={tw`flex-1`}>
        <Text style={tw`text-black font-bold text-base`}>{item.name}</Text>
        <Text style={tw`text-gray-500 text-xs mt-1`}>
          {item.restaurantName}
        </Text>
        <Text style={tw`text-primary font-semibold mt-1`}>
          ৳ {(item.price * item.quantity).toLocaleString()}
        </Text>
      </View>

      <View style={tw`flex-col items-center gap-2`}>
        <View style={tw`flex-row items-center gap-2 bg-gray-100 rounded-lg px-2 py-1`}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            style={tw`p-1`}
          >
            <Ionicons name="remove" size={16} color="#333" />
          </TouchableOpacity>

          <Text style={tw`text-black font-semibold w-6 text-center`}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            style={tw`p-1`}
          >
            <Ionicons name="add" size={16} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => removeFromCart(item.id)}
          style={tw`bg-red-100 rounded-lg p-2`}
        >
          <Ionicons name="trash" size={14} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <View
        style={tw`flex-1 pt-[${top}px] bg-white justify-center items-center`}
      >
        <Ionicons name="cart-outline" size={60} color="#ccc" />
        <Text style={tw`text-gray-500 text-lg mt-3`}>No items in cart</Text>
        <Text style={tw`text-gray-400 text-sm mt-1`}>
          Add items from search page
        </Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 pt-[${top}px] bg-white`}>
      <PageWrapper>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={tw`pb-32`}
          ListHeaderComponent={
            <Text style={tw`text-black text-xl font-bold mb-4`}>
              Your Orders ({cartItems.length})
            </Text>
          }
        />

        <View
          style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4`}
        >
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-gray-600 text-base`}>Total</Text>
            <Text style={tw`text-black font-bold text-lg`}>
              ৳ {totalPrice.toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity
            style={tw`bg-blue-500 py-3 rounded-xl items-center`}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </PageWrapper>
    </View>
  );
}
