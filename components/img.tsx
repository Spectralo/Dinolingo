import React from "react";
import FastImage from "react-native-fast-image";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Image({ url, style }) {
  const navigation = useNavigation();

  return (
    <Card
      style={[
        {
          margin: "2.5%",
          borderRadius: 10,
          overflow: "hidden",
          width: "45%",
        },
        style,
      ]}
      onPress={() => {
        navigation.navigate("imgDetail", { url });
      }}
    >
      <Card.Cover
        source={{
          uri: url,
        }}
        style={{ width: "100%", height: "100%" }} // Ensure the image covers the entire card
      />
    </Card>
  );
}
