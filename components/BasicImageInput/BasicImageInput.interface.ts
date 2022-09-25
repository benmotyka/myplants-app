import { ImageInfo } from "expo-image-picker";

export interface BasicImageInputProps {
  buttonText: string;
  image?: ImageInfo | { uri: string | undefined } | null;
  setImage: (...args: any[]) => void;
}
