import { Navigation } from "interfaces/Navigation";
import { Watering } from "interfaces/Watering";

export interface PlantProps extends Navigation{
  id: string;
  name: string;
  imgSrc?: string;
  onSlidingStart: () => void;
  onSlidingFinish: () => void;
  latestWatering?: Watering;
}
