import { Platform } from "react-native";
import { ImageInfo } from "expo-image-picker";

export const base64EncodeImage = (image: ImageInfo) => {
    switch (Platform.OS) {
        case 'web':
          return image.uri
        case 'ios': 
          return `data:image/jpg;base64,${image.base64}`
        case 'android': 
          // @TODO: check on android if this works
        return image.uri
      }
}