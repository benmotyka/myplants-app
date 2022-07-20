import { IWatering } from "interfaces/IWatering";
import { ImageSourcePropType } from "react-native";

export interface PlantProps {
  id: string;
  name: string;
  imgSrc: ImageSourcePropType;
  navigation: any;
  onSlidingStart: () => void;
  onSlidingFinish: () => void;
  latestWatering?: IWatering;
}
