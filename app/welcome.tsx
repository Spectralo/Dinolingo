import { View, Image } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://slack.com/oauth/authorize",
  tokenEndpoint: "https://slack.com/api/oauth.access",
};

export default function Index() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "CLIENT_ID",
      scopes: ["emoji:read"],
      redirectUri: makeRedirectUri({
        scheme: "your.app",
      }),
    },
    discovery,
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "start",
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
        <Image
          source={require("../assets/images/dinowave.png")}
          style={{ width: 300, height: 300, borderRadius: 1000 }}
          resizeMode="contain"
        />
      </View>
      <Text variant="headlineSmall" style={{ marginTop: 0 }}>
        You haven't practiced your dino drawing yet. Sign up or else...
      </Text>
      <Button
        style={{ alignItems: "end", marginTop: 40 }}
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
