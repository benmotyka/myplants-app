import { Watering } from "./Watering";

export interface Plant {
    id: string;
    name: string;
    description?: string;
    imgSrc?: string;    
    createdAt: string;
    shareId: string;
    latestWatering: Watering;
    wateringReminderFrequency?: number;
}