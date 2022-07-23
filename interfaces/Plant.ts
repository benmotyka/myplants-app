import { Watering } from "./Watering";

export interface Plant {
    id: string;
    name: string;
    description?: string;
    imgSrc?: string;    
    createdAt: string;
    latestWatering: Watering
}