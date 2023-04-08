export interface ImageData {
    id: string;
    url: string;
}

export interface PlantImagesHistoryData {
    [key: string]: ImageData[];
}
