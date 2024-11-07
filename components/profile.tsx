import * as React from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { Text, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogOut from "../scripts/logout";

export function Profile() {
  const [pseudo, setPseudo] = React.useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);

  // Fetch avatar and name once when component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      let name = await AsyncStorage.getItem("name");
      let avatar = await AsyncStorage.getItem("avatar");
      name = name.slice(1, -1);
      avatar = avatar.slice(1, -1);
      setPseudo(name);
      setAvatarUrl(avatar);
      console.log("Stored avatar:", avatar);
      console.log("Stored name:", name);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await LogOut();
    expo.reloadAppAsync("logout");
    // Ensure this function is called
    // Navigate to login or reset app state here instead of reloading the app
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
        <Text variant="titleLarge">{pseudo}</Text>
        {avatarUrl && (
          <FastImage
            source={{ uri: avatarUrl }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
          />
        )}
      </View>
      <Button mode="elevated" onPress={handleLogout}>
        <Text>Log Out</Text>
      </Button>
    </View>
  );
}
