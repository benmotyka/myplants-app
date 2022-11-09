import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Platform } from "react-native";

export const getDeviceId = async () => {
  if (Platform.OS !== "web") {
    const deviceId = await SecureStore.getItemAsync("device_id");

    if (!deviceId) {
      const id = uuidv4();
      await SecureStore.setItemAsync("device_id", JSON.stringify(id));
      return id;
    }

    return deviceId;
  }

  const browserId = localStorage.getItem("device_id");

  if (!browserId) {
    const id = uuidv4();
    localStorage.setItem("device_id", id);
    return id;
  }

  return browserId;
};
