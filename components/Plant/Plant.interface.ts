import { Watering } from "interfaces/Watering";

export interface PlantProps {
  id: string;
  name: string;
  imgSrc?: string;
  navigation: any;
  onSlidingStart: () => void;
  onSlidingFinish: () => void;
  latestWatering?: Watering;
}
