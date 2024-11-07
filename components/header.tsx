import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const [streak, setStreak] = React.useState<Int32Array | null>(null);
  const [lovecoins, setLovecoins] = React.useState<Int32Array | null>(null);

  React.useEffect(() => {
    const fetchStreak = async () => {
      let streakstr = await AsyncStorage.getItem("streak");
      let lovecoinsstr = await AsyncStorage.getItem("lovecoins");
      let streak = parseInt(streakstr);
      let lovecoins = parseInt(lovecoinsstr);
      setStreak(streak);
      setLovecoins(lovecoins);
    };
    fetchStreak();
  }, []);

  return (
    <View
      style={{
        height: "6%",
        width: "100%",
        justifyContent: "center",
        backgroundColor: useTheme().colors.card,
        padding: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Text>
          Streak : {streak} Likes : {lovecoins}
        </Text>
      </View>
    </View>
  );
}
