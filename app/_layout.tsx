import { Slot } from "expo-router";
import { MD3DarkTheme, MD3LightTheme, useTheme } from "react-native-paper";

import { Provider as PaperProvider } from "react-native-paper";

import Color from "color";

// Base colors
const primaryColor = "#EC3750"; // Hack Club Red
const accentColor = "#33D6A6"; // Hack Club Green
const backgroundColor = "#1A1A1D"; // Softer dark background
const surfaceColor = "#242429"; // Softer dark surface
const textColor = "#FFFFFF"; // White text

// Semi-transparent black for backdrops and overlays
const backdropColor = "rgba(0, 0, 0, 0.5)"; // 50% opaque black

// Function to adjust colors
const lighten = (color, amount) => Color(color).lighten(amount).hex();
const mix = (color1, color2, amount) =>
  Color(color1).mix(Color(color2), amount).hex();

// Elevation colors (lighter shades of surfaceColor with a touch of red)
const elevationLevels = {
  level0: surfaceColor,
  level1: mix(lighten(surfaceColor, 0.05), primaryColor, 0.05),
  level2: mix(lighten(surfaceColor, 0.1), primaryColor, 0.05),
  level3: mix(lighten(surfaceColor, 0.15), primaryColor, 0.05),
  level4: mix(lighten(surfaceColor, 0.2), primaryColor, 0.05),
  level5: mix(lighten(surfaceColor, 0.25), primaryColor, 0.05),
};

export const hackClubDarkColors = {
  // Base theming colors
  primary: primaryColor,
  accent: accentColor,
  background: backgroundColor,
  surface: surfaceColor,
  text: textColor,
  disabled: "#A0A0A0", // Slightly lighter gray for disabled elements
  placeholder: "rgba(255, 255, 255, 0.54)", // Semi-transparent white for placeholders
  backdrop: backdropColor, // Semi-transparent black for backdrops
  notification: primaryColor,
  error: primaryColor,

  // Additional colors
  onSurface: textColor,
  onBackground: textColor,
  border: mix("#3C4858", primaryColor, 0.2), // Slate with a touch of red
  outline: mix("#8492A6", primaryColor, 0.1), // Muted color with a touch of red

  // Elevation levels
  elevation: elevationLevels,
};

export const theme = {
  ...MD3DarkTheme,
  dark: true,
  roundness: 4,
  colors: {
    ...MD3DarkTheme.colors,
    ...hackClubDarkColors,
  },
};

// Navigation bar transparent
import * as NavigationBar from "expo-navigation-bar";

NavigationBar.setPositionAsync("absolute");
NavigationBar.setBackgroundColorAsync("#ffffff01");

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  );
}
