import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./welcome";
import * as Linking from "expo-linking";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { adaptNavigationTheme } from "react-native-paper";

const prefix = Linking.createURL("/");

const { DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
});

export default function App() {
  const Stack = createStackNavigator();
  const linking = {
    prefixes: [prefix],
  };

  return (
    <NavigationContainer independent={true} linking={linking} theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
