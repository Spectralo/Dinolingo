import React, { useState } from "react";
import { View, GestureResponderEvent } from "react-native";
import { Canvas, Path } from "@shopify/react-native-skia";
import { FAB } from "react-native-paper";

interface IPath {
  segments: string[];
  color?: string;
}

export default function Draw() {
  const [paths, setPaths] = useState<IPath[]>([]);

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

  return (
    <View style={{ flex: 1 }}>
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
