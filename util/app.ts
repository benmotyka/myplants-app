import { Platform } from "react-native";
import VersionCheck from "react-native-version-check";

export const getAppVersion = () => {
  switch (Platform.OS) {
    case "web":
      return "1.2.3";
    case "ios":
      return VersionCheck.getLatestVersion({
        provider: "ios",
      });
    case "android":
      return VersionCheck.getLatestVersion({
        provider: "android",
      });
  }
};
