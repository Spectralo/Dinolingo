import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

async function getToken() {
  let result = await SecureStore.getItemAsync("token");
  return result ? result : null;
}

export default async function fetch() {
  console.log("Fetching user data");
  let token = await getToken();

  axios
    .get("https://slack.com/api/openid.connect.userInfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      AsyncStorage.setItem(
        "avatar",
        JSON.stringify(response.data["https://slack.com/user_image_72"]),
      );
      AsyncStorage.setItem("name", JSON.stringify(response.data.name));
    });
}
