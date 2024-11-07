import React, { useState } from "react";
import { View, GestureResponderEvent } from "react-native";
import { Canvas, Path, useTouchHandler } from "@shopify/react-native-skia";
import { Button, FAB } from "react-native-paper";
import Header from "../../components/header";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-paper";
import FastImage from "react-native-fast-image";

interface IPath {
  segments: string[];
  color?: string;
}

export default function Draw() {
  const [paths, setPaths] = useState<IPath[]>([]);
  const [streak, setStreak] = useState<number | null>(null);
  let starting: Boolean = false;

  const fetchStreak = async () => {
    let streakstr = await AsyncStorage.getItem("streak");
    let streak = parseInt(streakstr);
    setStreak(streak);
  };

  const handleTouchStart = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    setPaths((prevPaths) => [
      ...prevPaths,
      {
        segments: [`M ${locationX} ${locationY}`],
        color: "#fffff",
      },
    ]);
  };

  const handleTouchMove = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    setPaths((prevPaths) => {
      const newPaths = [...prevPaths];
      const index = newPaths.length - 1;
      if (newPaths[index]?.segments) {
        newPaths[index].segments = [
          ...newPaths[index].segments,
          `L ${locationX} ${locationY}`,
        ];
      }
      return newPaths;
    });
  };

  const handleUndo = () => {
    setPaths((prevPaths) => prevPaths.slice(0, -1));
  };

  console.log(streak);

  if (streak == 0 || streak == null) {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FastImage
            source={require("../../assets/images/crying_dino.png")}
            style={{ width: 300, height: 300, margin: 10, borderRadius: 20 }}
          />
          <Text>Hey</Text>
          <Button
            mode="contained"
            onPress={() => (starting = true)}
            style={{ margin: 10 }}
          >
            {" "}
            Draw now!!!{" "}
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View
        style={{
          flex: 1,
          backgroundColor: "#f0f0f0",
        }}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderStart={handleTouchStart}
        onResponderMove={handleTouchMove}
      >
        <Canvas
          style={{
            flex: 1,
          }}
        >
          {paths.map((p, index) => (
            <Path
              key={index}
              path={p.segments.join(" ")}
              strokeWidth={5}
              style="stroke"
              color={p.color}
            />
          ))}
        </Canvas>
      </View>
      <FAB
        icon="undo"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => handleUndo()}
      />
    </View>
  );
}
