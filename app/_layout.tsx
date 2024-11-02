import { Slot } from "expo-router";
import {
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  useTheme,
} from "react-native-paper";

// Navigation bar transparent
import * as NavigationBar from "expo-navigation-bar";
import { useColorScheme } from "react-native";

NavigationBar.setPositionAsync("absolute");
NavigationBar.setBackgroundColorAsync("#ffffff01");

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const paperTheme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <Slot />
    </PaperProvider>
  );
}
