import { IWatering } from "./IWatering";

export interface IPlant {
    id: string;
    name: string;
    description?: string;
    imgSrc?: string;    
    createdAt: string;
    latestWatering: IWatering
}