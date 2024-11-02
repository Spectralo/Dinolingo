import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
const Tab = createMaterialBottomTabNavigator();
import { MaterialIcons } from "@expo/vector-icons";

// Tabs imports
import Draw from "./(tabs)/draw";
import Explore from "./(tabs)/explore";
import Settings from "./(tabs)/settings";

export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Draw"
        component={Draw}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="brush" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
