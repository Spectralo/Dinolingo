import { Text, Button, Portal, Dialog, Switch } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";

import { Profile } from "../../components/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hideAsync } from "expo-splash-screen";
import { Checkbox } from "react-native-paper";

export default function Settings() {
  const [visible, setVisible] = useState(false);

  async function resetData() {
    // Reset data
    AsyncStorage.removeItem("streakdate");
    AsyncStorage.removeItem("streak");
    AsyncStorage.removeItem("drawingsent");

    setVisible(false);
  }

  return (
    <View
      style={{
        padding: 20,
        flex: 1,
      }}
    >
      <Profile />
      <Button
        mode="elevated"
        style={{ marginTop: 10 }}
        onPress={() => {
          setVisible(true);
        }}
      >
        <Text>Reset data</Text>
      </Button>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to reset all data?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                resetData();
              }}
            >
              Reset
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
