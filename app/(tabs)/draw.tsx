import React, { useState } from "react";
import { View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path } from "@shopify/react-native-skia";

interface IPath {
  segments: string[];
  color?: string;
}

export default function Draw() {
  const [paths, setPaths] = useState<IPath[]>([]);

  const pan = Gesture.Pan()
    .onStart((g) => {
      setPaths((prevPaths) => [
        ...prevPaths,
        {
          segments: [`M ${g.x} ${g.y}`],
          color: "#06d6a0",
        },
      ]);
    })
    .onUpdate((g) => {
      setPaths((prevPaths) => {
        const newPaths = [...prevPaths];
        const index = newPaths.length - 1;
        if (newPaths[index]?.segments) {
          newPaths[index].segments = [
            ...newPaths[index].segments,
            `L ${g.x} ${g.y}`,
          ];
        }
        return newPaths;
      });
    })
    .minDistance(1);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <Canvas style={{ flex: 8 }}>
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
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
