import * as SecureStore from "expo-secure-store";

async function save_token({ value }: { value: string }) {
  await SecureStore.setItemAsync("token", value);
}

async function get_token({ key }: { key: string }) {
  let result = await SecureStore.getItemAsync(key);
  result = result ? result : null;
  return result;
}

async function clear_session() {
  try {
    await SecureStore.deleteItemAsync("session");
    console.log("SecureStore cleared: null");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

export { clear_session, get_token, save_token };
