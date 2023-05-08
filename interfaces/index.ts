import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    home: undefined;
    addPlant: undefined;
    editPlant: { plantId: string };
    plantHistory: { plantId: string };
    importPlant: undefined;
    settings: undefined;
    settingsNotifications: undefined;
    settingsApp: undefined;
    settingsContactReportBug: undefined;
};

export interface Navigation {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        keyof RootStackParamList,
        string | undefined
    >;
}

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

export interface ImageData {
    id: string;
    url: string;
}

export interface PlantImagesHistoryData {
    [key: string]: ImageData[];
}

export interface UserSettings {
    pushNotificationsEnabled: boolean;
}

export interface Watering {
    id: string;
    plantId: string;
    createdAt: string;
    updatedAt: string;
}

export interface WateringData {
    [key: string]: string[];
}
