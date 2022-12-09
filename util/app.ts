import { Platform } from "react-native";
import VersionCheck from "react-native-version-check";

export const getCurrentAppVersion = () => {
  switch (Platform.OS) {
    case "ios":
    case "android":
      return VersionCheck.getCurrentVersion();
    default:
      return "1.2.3"
  }
};
