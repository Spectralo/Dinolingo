import React, { useState, useEffect, useRef } from "react";
import { View, GestureResponderEvent, Alert } from "react-native";
import { Canvas, Path } from "@shopify/react-native-skia";
import { Button, FAB, Portal, Dialog, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";
import * as FileSystem from "expo-file-system";

interface IPath {
  segments: string[];
  color?: string;
}

export default function Draw() {
  const [paths, setPaths] = useState<IPath[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [drawingSent, setDrawingSent] = useState(false);
  const [drawing, setDrawing] = useState(false);

  const skiaViewRef = useRef<any>(null);

  useEffect(() => {
    const fetchStreakData = async () => {
      const streakDateStr = await AsyncStorage.getItem("streakdate");
      const storedStreak = parseInt(
        (await AsyncStorage.getItem("streak")) || "0",
        10,
      );
      const sentStatus = (await AsyncStorage.getItem("drawingsent")) === "true";

      const isNewDay =
        new Date(streakDateStr || "").getDate() !== new Date().getDate();
      setDrawingSent(!isNewDay && sentStatus);
      setStreak(storedStreak);

      let lastSentDate = await AsyncStorage.getItem("streakdate");

      if (lastSentDate === new Date().getDate().toString()) {
        setDrawingSent(true);
      }
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

  const saveDrawing = async () => {
    setIsDialogVisible(false);
    setDrawingSent(true);

    try {
      const image = skiaViewRef.current?.makeImageSnapshot();
      if (!image) {
        console.error("Failed to capture image snapshot");
        Alert.alert("Error", "Failed to capture image snapshot.");
        return;
      }

      const pngBase64 = image.encodeToBase64();

      if (!pngBase64) {
        console.error("Failed to encode image to base64");
        Alert.alert("Error", "Failed to encode image to base64.");
        return;
      }

      const directory = `${FileSystem.documentDirectory}drawings/`;
      const today = new Date();
      const todayDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1,
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      const fileUri = `${directory}drawing_${todayDate}.png`;

      const dirInfo = await FileSystem.getInfoAsync(directory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      }

      await FileSystem.writeAsStringAsync(fileUri, pngBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const existingDrawings = await AsyncStorage.getItem("drawings");
      let drawings: string[] = [];
      if (existingDrawings) drawings = JSON.parse(existingDrawings);
      drawings.push(fileUri);
      await AsyncStorage.setItem("drawings", JSON.stringify(drawings));

      setStreak(streak + 1);
      await AsyncStorage.multiSet([
        ["drawingsent", "true"],
        ["streak", (streak + 1).toString()],
        ["streakdate", todayDate],
      ]);

      setPaths([]);
    } catch (error) {
      console.error("Error saving drawing:", error);
      Alert.alert("Error", "An error occurred while saving your drawing.");
    }
  };

  const startDrawing = () => {
    setDrawingSent(false);
    setDrawing(true);
    setPaths([]);
  };

  return (
    <View style={{ flex: 1 }}>
      {streak === 0 && drawing == false ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <FastImage
            source={require("../../assets/images/crying_dino.png")}
            style={{ width: 300, height: 300, margin: 10, borderRadius: 20 }}
          />
          <Text
            variant="headlineSmall"
            style={{
              marginTop: 50,
              textAlign: "center",
              marginHorizontal: 20,
            }}
          >
            You broke your streak! Draw a dino to make them happy again!
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
          <Text
            variant="headlineSmall"
            style={{
              marginTop: 50,
              textAlign: "center",
              fontWeight: "bold",
              marginHorizontal: 20,
            }}
          >
            You made the dino happy! You drew dinos for {streak} days!!
          </Text>
          <Text
            variant="headlineSmall"
            style={{
              fontStyle: "italic",
              textAlign: "center",
              marginHorizontal: 20,
              marginTop: 10,
            }}
          >
            You'll come back right?????
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
            <Canvas ref={skiaViewRef} style={{ flex: 1 }}>
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
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            onPress={handleUndo}
          />
          <FAB
            icon="check"
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 70,
            }}
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
                  Do you want to save this drawing?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setIsDialogVisible(false)}>
                  Cancel
                </Button>
                <Button onPress={saveDrawing}>Save</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </>
      )}
    </View>
  );
}
