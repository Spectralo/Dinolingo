import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { Text, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogOut from "../scripts/logout";
import Fetch from "../scripts/fetch";
import { useNavigation, CommonActions } from "@react-navigation/native";

let avatarURL = "";

const getAvatar = async () => {
  Fetch;
  try {
    const value = await AsyncStorage.getItem("avatar");
    if (value !== null) {
      avatarURL = value;
      console.log(value);
    } else {
      avatarURL = "https://placehold.co/50x50";
      console.log("avatar not found, thats strange :thinkies:");
    }
  } catch (e) {
    console.log(e);
  }
};

getAvatar();

export function Profile() {
  const navigation = useNavigation();

  const LogOutComplete = async () => {
    LogOut;
    expo.reloadAppAsync("logout");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text variant="titleLarge">User Name</Text>
        <FastImage
          source={{
            uri: avatarURL,
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
          }}
        />
      </View>
      <Button mode="elevated" onPress={LogOutComplete}>
        <Text>Log Out</Text>
      </Button>
      <Button
        mode="elevated"
        onPress={() => getAvatar()}
        style={{ marginTop: 10 }}
      >
        <Text>ReFetch (Debug)</Text>
      </Button>
    </View>
  );
}
