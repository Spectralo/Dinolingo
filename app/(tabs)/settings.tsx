import { Text } from "react-native-paper";
import { View } from "react-native";
import Header from "../../components/header";

import { Profile } from "../../components/profile";

export default function Settings() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Header />
      <View
        style={{
          padding: 20,
        }}
      >
        <Profile />
      </View>
    </View>
  );
}
