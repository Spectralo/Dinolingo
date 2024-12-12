import React, { useState, useEffect, useRef } from "react";
import { View, GestureResponderEvent } from "react-native";
import { Canvas, Path } from "@shopify/react-native-skia";
import { Button, FAB, Portal, Dialog, Text } from "react-native-paper";
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
  const [drawing, setDrawing] = useState(false);

  const skiaViewRef = useRef(null); // Add a ref to the Canvas

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

      let lastSentDate = await AsyncStorage.getItem("streakdate");

      if (lastSentDate == new Date().getDate().toString()) {
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

  const sendDrawing = async () => {
    setIsDialogVisible(false);
    setDrawingSent(true);

    // Get the canvas image as a snapshot
    const image = skiaViewRef.current?.makeImageSnapshot();
    if (!image) {
      console.error("Failed to capture image snapshot");
      return;
    }

    // Encode the image to base64
    const base64Image = image.encodeToBase64();
    if (!base64Image) {
      console.error("Failed to encode image to base64");
      return;
    }

    let name = await AsyncStorage.getItem("name");

    // Provide a default value if name is null
    const authorName = name || "Unknown Author";

    // Create a FormData object and append the base64 image
    const formData = new FormData();
    formData.append("file", base64Image);

    // Append the author's name
    formData.append("author", authorName);

    // Send the form data to your server
    try {
      const response = await fetch(
        "https://dino.spectralo.hackclub.app/upload",
        {
          method: "POST",
          body: formData,
          // When using FormData, you typically don't need to set the 'Content-Type' header
        },
      );
      const resultText = await response.text();
      console.log("Upload successful:", resultText);
      const today = new Date();
      const todayDate = today.getDate();
      setStreak(streak + 1);

      await AsyncStorage.multiSet([
        ["drawingsent", "true"],
        ["streak", (streak + 1).toString()],
        ["streakdate", todayDate.toString()],
      ]);
    } catch (error) {
      console.error("ptdr ça a crashé", error);
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
            style={{ marginTop: 50, textAlign: "center", marginHorizontal: 20 }}
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
