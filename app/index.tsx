import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./welcome";
import MainScreen from "./main";
import * as Linking from "expo-linking";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  useRoute,
} from "@react-navigation/native";
import { adaptNavigationTheme, ActivityIndicator } from "react-native-paper";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { View } from "react-native";
import { reloadAppAsync } from "expo";

const prefix = Linking.createURL("/");
const { DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
});

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

  // Check params

  const route = useRoute();
  const parameters = route.params || {};

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
      reloadAppAsync();
    }
  }, [parameters.token]);

  useEffect(() => {
    // Check for the token in SecureStore
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        setIsAuthenticated(!!token); // If token exists, set authenticated to true
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
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer independent={true} linking={linking} theme={DarkTheme}>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainScreen} />
        ) : (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
