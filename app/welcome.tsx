import { View, Image } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

WebBrowser.maybeCompleteAuthSession();

function promptAsync() {
  WebBrowser.openAuthSessionAsync(
    "https://dino.spectralo.hackclub.app/oauth/start",
  );
}

export default function Index() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        marginHorizontal: 50,
      }}
    >
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <FastImage
          source={require("../assets/images/dinowave.png")}
          style={{ width: 290, height: 300, borderRadius: 1000 }}
          resizeMode="contain"
        />
      </View>
      <Text variant="headlineSmall" style={{ marginTop: 0 }}>
        You haven't practiced your dino drawing yet. Sign up or else...
      </Text>
      <Button
        style={{ alignItems: "center", marginTop: 40, width: "100%" }}
        mode="elevated"
        onPress={() => {
          promptAsync();
        }}
      >
        Login
      </Button>
    </View>
  );
}
