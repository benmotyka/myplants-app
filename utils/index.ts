import { Platform } from "react-native";
// @ts-ignore
import VersionCheck from "react-native-version-check-expo";
import * as Linking from "expo-linking";
import { googlePlayStoreUrl, appStoreUrl } from "config";

// export const handleError = (error: unknown) => {
//     Sentry.captureException(error);
// };

export const getCurrentAppVersion = () => {
  try {
    if (["ios", "android"].includes(Platform.OS)) {
      return VersionCheck.getCurrentVersion();
    }
  } catch (error) {
    console.log(error);
  }
};

const getLatestAppVersion = async () => {
  try {
    switch (Platform.OS) {
      case "ios":
        return await VersionCheck.getLatestVersion({
          provider: "appStore",
        });
      case "android":
        return await VersionCheck.getLatestVersion({
          provider: "playStore",
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const isNewUpdate = async () => {
  const currentVersion = getCurrentAppVersion();
  const latestVersion = await getLatestAppVersion();
  if (currentVersion && latestVersion) {
    return latestVersion !== currentVersion;
  }
};

export const redirectToStore = () => {
  switch (Platform.OS) {
    case "ios":
      return Linking.openURL(appStoreUrl);
    default:
      return Linking.openURL(googlePlayStoreUrl);
  }
};

export const shouldShowRateAppModal = (plantsAmount: number) => {
  // If user has more than PLANTS_AMOUNT_THRESHOLD plant,
  // there's chance they they will see the 'Rate App' modal
  const CHANCE_THRESHOLD = 5; // %
  const PLANTS_AMOUNT_THRESHOLD = 1;
  if (plantsAmount < PLANTS_AMOUNT_THRESHOLD) return;

  return Math.random() * 100 < CHANCE_THRESHOLD;
};
