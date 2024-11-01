import { Slot } from "expo-router";
import {
  MD3DarkTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";

// Navigation bar transparent
import * as NavigationBar from "expo-navigation-bar";

NavigationBar.setPositionAsync("absolute");
NavigationBar.setBackgroundColorAsync("#ffffff01");

export default function RootLayout() {
  // Dark or Light mode
  return (
    <PaperProvider>
      <Slot />
    </PaperProvider>
  );
}
