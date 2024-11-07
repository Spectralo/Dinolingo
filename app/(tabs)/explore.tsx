import { Text } from "react-native-paper";
import { View } from "react-native";
import Header from "../../components/header";

export default function Explore() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Header />
      <Text>Explore Screen</Text>
    </View>
  );
}
