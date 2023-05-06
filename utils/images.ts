import { Platform } from "react-native";
import { ImageInfo } from "expo-image-picker";

export const base64EncodeImage = (image: ImageInfo) => {
    switch (Platform.OS) {
        case "web":
            return image.uri;
        case "ios":
        case "android":
            return `data:image/jpg;base64,${image.base64}`;
    }
};
