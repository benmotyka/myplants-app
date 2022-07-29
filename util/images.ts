import { Platform } from "react-native";

// @TODO: add type, check for android
export const base64EncodeImage = (image: any) => {
    switch (Platform.OS) {
        case 'web':
          return image.uri
        case 'ios': 
          return `data:image/jpg;base64,${image.base64}`
      }
}