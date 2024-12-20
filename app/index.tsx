import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./welcome";
import MainScreen from "./main";
import Imgdetail from "./(stack)/imgdetail";

import * as Linking from "expo-linking";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import {
  adaptNavigationTheme,
  ActivityIndicator,
  PaperProvider,
} from "react-native-paper";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { View } from "react-native";
import { useColorScheme } from "react-native";

const prefix = Linking.createURL("/");
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// Scripts imports
import Fetch from "../scripts/fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const Stack = createStackNavigator();
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Success: "success",
      },
    },
  };

  let navTheme = useColorScheme() === "dark" ? DarkTheme : LightTheme;
  // Check params

  const route = useRoute();
  const parameters = route.params || {};
  const theme = useTheme();

  async function save(key: any, value: any) {
    setLoading(true);
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (parameters.token) {
      save("token", parameters.token);
      Fetch();
      AsyncStorage.setItem("streak", "0");
      AsyncStorage.setItem("lovecoins", "0");
      AsyncStorage.setItem("streakdate", Date.parse("2021-01-01").toString());
      setIsAuthenticated(true);
    }
  }, [parameters.token]);

  useEffect(() => {
    // Check for the token in SecureStore
    setLoading(true);
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        Fetch();
        setIsAuthenticated(!!token);
        // If token exists, set authenticated to true
      } catch (e) {
        console.log("Error retrieving token:", e);
      } finally {
        setLoading(false); // Stop loading regardless of token presence
      }
    };
    checkToken();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer independent={true} linking={linking} theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="imgDetail" component={Imgdetail} />
          </>
        ) : (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
