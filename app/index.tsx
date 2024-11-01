import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./welcome";
import LoginScreen from "./login";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
