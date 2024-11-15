import React, { useState, useEffect } from "react";
import { View, GestureResponderEvent } from "react-native";
import { Canvas, Path } from "@shopify/react-native-skia";
import { Button, FAB, Portal, Dialog, Text } from "react-native-paper";
import Header from "../../components/header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";

interface IPath {
  segments: string[];
  color?: string;
}

export default function Draw() {
  const [paths, setPaths] = useState<IPath[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [drawingSent, setDrawingSent] = useState(false);

  useEffect(() => {
    const fetchStreakData = async () => {
      const streakDateStr = await AsyncStorage.getItem("streakdate");
      const storedStreak = parseInt(
        (await AsyncStorage.getItem("streak")) || "0",
      );
      const sentStatus = (await AsyncStorage.getItem("drawingsent")) === "true";

      const isNewDay =
        new Date(streakDateStr || "").getDate() !== new Date().getDate();
      setDrawingSent(!isNewDay && sentStatus);
      setStreak(storedStreak);
    };
    fetchStreakData();
  }, []);

  const handleTouchStart = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    setPaths((prevPaths) => [
      ...prevPaths,
      {
        segments: [`M ${locationX} ${locationY}`],
        color: "#000000",
      },
    ]);
  };

  const handleTouchMove = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    setPaths((prevPaths) => {
      const newPaths = [...prevPaths];
      const currentPath = newPaths[newPaths.length - 1];
      if (currentPath) {
        currentPath.segments.push(`L ${locationX} ${locationY}`);
      }
      return newPaths;
    });
  };

  const handleUndo = () => setPaths((prevPaths) => prevPaths.slice(0, -1));

  const sendDrawing = async () => {
    setIsDialogVisible(false);
    setDrawingSent(true);
    setStreak(streak + 1);

    await AsyncStorage.multiSet([
      ["drawingsent", "true"],
      ["streak", (streak + 1).toString()],
      ["streakdate", new Date().toString()],
    ]);
  };

  const startDrawing = () => {
    setDrawingSent(false);
    setPaths([]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {streak === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <FastImage
            source={require("../../assets/images/crying_dino.png")}
            style={{ width: 300, height: 300, margin: 10, borderRadius: 20 }}
          />
          <Text variant="headlineSmall" style={{ marginTop: 50 }}>
            You made the dino cry ...
          </Text>
          <Button
            mode="contained"
            onPress={startDrawing}
            style={{ margin: 10 }}
          >
            Draw now!
          </Button>
        </View>
      ) : drawingSent ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <FastImage
            source={require("../../assets/images/happy_dino.png")}
            style={{ width: 300, height: 300, margin: 10, borderRadius: 20 }}
          />
          <Text variant="headlineSmall" style={{ marginTop: 50 }}>
            You made the dino happy! Your streak is now {streak}
          </Text>
        </View>
      ) : (
        <>
          <View
            style={{ flex: 1, backgroundColor: "#f0f0f0" }}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderStart={handleTouchStart}
            onResponderMove={handleTouchMove}
          >
            <Canvas style={{ flex: 1 }}>
              {paths.map((path, index) => (
                <Path
                  key={index}
                  path={path.segments.join(" ")}
                  strokeWidth={5}
                  style="stroke"
                  color={path.color}
                />
              ))}
            </Canvas>
          </View>
          <FAB
            icon="undo"
            style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
            onPress={handleUndo}
          />
          <FAB
            icon="check"
            style={{ position: "absolute", margin: 16, right: 0, bottom: 70 }}
            onPress={() => setIsDialogVisible(true)}
          />
          <Portal>
            <Dialog
              visible={isDialogVisible}
              onDismiss={() => setIsDialogVisible(false)}
            >
              <Dialog.Title>Are you sure?</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  The dinos won’t be happy if this isn’t one of their friends...
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setIsDialogVisible(false)}>
                  Cancel
                </Button>
                <Button onPress={sendDrawing}>Send</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </>
      )}
    </View>
  );
}
