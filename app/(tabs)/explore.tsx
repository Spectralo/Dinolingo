import React from "react";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import Image from "@/components/img"; // Make sure this component accepts 'style' prop

export default function Explore() {
  const images = [];

  // Generate 100 images with unique IDs and URLs
  for (let i = 1; i <= 10; i++) {
    images.push({
      id: i.toString(),
      src: `https://picsum.photos/seed/${i}/700`,
    });
  }

  const numColumns = 2; // Number of columns
  const imageMargin = 5; // Margin around each image
  const screenWidth = Dimensions.get("window").width; // Screen width
  const imageSize = (screenWidth - imageMargin * (numColumns + 1)) / numColumns; // Calculate image size

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Image
          url={item.src}
          style={[styles.image, { width: imageSize, height: imageSize }]}
        />
      )}
      numColumns={numColumns}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 0,
    padding: 0,
  },
  image: {
    margin: 5,
  },
});
