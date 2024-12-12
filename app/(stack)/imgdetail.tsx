import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Button, IconButton } from "react-native-paper";

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
        style={{ width: "80%", height: "60%", borderRadius: 20 }}
        source={{
          uri: route.params.url,
          priority: FastImage.priority.normal,
        }}
      />

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
