import { View, Image } from "react-native";
import { Text, Button } from "react-native-paper";

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
        <Text variant="titleLarge">User Name</Text>
        <Image
          source={require("../assets/images/avatar.jpeg")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
          }}
        />
      </View>
      <Button mode="elevated">
        <Text>Log Out</Text>
      </Button>
    </View>
  );
}
