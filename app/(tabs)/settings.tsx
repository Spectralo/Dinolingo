import { Text } from "react-native-paper";
import { View } from "react-native";

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
