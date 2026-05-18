import { useSession } from "@/components/auth/ctx";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function App() {
  const [key, onChangeKey] = useState("Your key here");
  const [value, onChangeValue] = useState("Your value here");
  const { signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Save an item, and grab it later!</Text>

      <Button title="Save this key/value pair" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    height: 35,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 4,
  },
});
