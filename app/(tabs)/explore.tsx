import React from "react";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import Image from "@/components/img"; // Make sure this component accepts 'style' prop
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

export default function Explore() {
  const [images, setImages] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useFocusEffect(() => {
    const fetchDrawings = async () => {
      try {
        const storedDrawings = await AsyncStorage.getItem("drawings");
        if (storedDrawings) {
          const parsedDrawings: string[] = JSON.parse(storedDrawings);
          setImages(parsedDrawings);
        }
      } catch (error) {
        console.error("Error fetching drawings from storage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrawings();
  });

  const numColumns = 2; // Number of columns
  const imageMargin = 5; // Margin around each image
  const screenWidth = Dimensions.get("window").width; // Screen width
  const imageSize = (screenWidth - imageMargin * (numColumns + 1)) / numColumns; // Calculate image size

  const renderItem = ({ item }: { item: string }) => (
    <Image
      url={item}
      style={[styles.image, { width: imageSize, height: imageSize }]}
    />
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (images.length === 0) {
    return (
      <View style={styles.center}>
        <Text
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            margin: 20,
          }}
          variant="titleMedium"
        >
          No dinos found awww. Start drawing to populate the explore page!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => index.toString()} // Using index as key since URIs are unique
      renderItem={renderItem}
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
