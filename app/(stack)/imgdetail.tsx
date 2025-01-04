import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Button, IconButton } from "react-native-paper";
import * as Sharing from "expo-sharing";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function Imgdetail() {
  const route = useRoute();
  const navigation = useNavigation();

  console.log(route.params.url);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FastImage
        style={{
          width: "80%",
          height: "60%",
          borderRadius: 20,
          backgroundColor: "#fff",
        }}
        source={{
          uri: route.params.url,
          priority: FastImage.priority.normal,
        }}
      />
      <Button
        style={{ marginTop: 20 }}
        onPress={() => {
          Sharing.shareAsync(route.params.url);
        }}
        mode="contained"
      >
        Share
      </Button>
      <Button
        style={{ marginTop: 20 }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        Go back
      </Button>
    </View>
  );
}
