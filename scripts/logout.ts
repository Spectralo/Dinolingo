import * as SecureStore from "expo-secure-store";
import { reloadAppAsync } from "expo";

export default async function logout() {
  await SecureStore.deleteItemAsync("token");
  console.log("Logged out");
}
