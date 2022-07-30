import { ImageInfo } from "expo-image-picker";

export interface BasicImageInputProps {
  buttonText: string;
  image?: ImageInfo | { uri: string | undefined };
  setImage: (...args: any[]) => void;
}
