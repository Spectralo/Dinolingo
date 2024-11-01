import { Slot } from "expo-router";
import {
  MD3DarkTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

// Navigation bar transparent
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

NavigationBar.setPositionAsync("absolute");
NavigationBar.setBackgroundColorAsync("#ffffff01");

const { DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
});

export default function RootLayout() {
  // Dark or Light mode
  return (
    <PaperProvider>
      <NavigationContainer independent={true} theme={DarkTheme}>
        <SafeAreaProvider style={{ flex: 1 }}>
          <Slot />
        </SafeAreaProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
