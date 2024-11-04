import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { Text, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogOut from "../scripts/logout";
import Fetch from "../scripts/fetch";

let avatarUrl: string;
let name: any;

async function getInfo() {
  name = await AsyncStorage.getItem("name");
}

const LogOutComplete = async () => {
  LogOut;
  expo.reloadAppAsync("logout");
};

export function Profile() {
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
        <Text variant="titleLarge">@{name}</Text>
        <FastImage
          source={{
            uri: avatarUrl,
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
      <Button mode="elevated" onPress={Fetch} style={{ marginTop: 10 }}>
        <Text>ReFetch (Debug)</Text>
      </Button>
    </View>
  );
}
