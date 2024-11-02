import { Slot } from "expo-router";
import { PaperProvider, adaptNavigationTheme } from "react-native-paper";

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
