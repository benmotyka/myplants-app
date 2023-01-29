import { Platform } from "react-native";
import VersionCheck from "react-native-version-check";
import * as Linking from "expo-linking";
import { googlePlayStoreUrl, appStoreUrl } from "config";

// const getCurrentAppVersion = () => {
//     switch (Platform.OS) {
//         case "ios":
//         case "android":
//             return VersionCheck.getCurrentVersion();
//         default:
//             return "1.2.3";
//     }
// };

// const getLatestAppVersion = async () => {
//     switch (Platform.OS) {
//         case "ios":
//             return await VersionCheck.getLatestVersion({
//                 provider: "appStore",
//             });
//         case "android":
//             return await VersionCheck.getLatestVersion({
//                 provider: "playStore",
//             });
//         default:
//             return "1.2.3";
//     }
// };

// const isNewUpdate = async () => {
//     try {
//         const currentVersion = getCurrentAppVersion();
//         const latestVersion = await getLatestAppVersion();
//         return latestVersion !== currentVersion;
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// };

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
    if (plantsAmount < PLANTS_AMOUNT_THRESHOLD) return false;

    return Math.random() * 100 < CHANCE_THRESHOLD;
};
