import plantsApi from "config/api/plants";
import { Plant } from "interfaces/Plant";
import { PlantImagesHistoryData } from "interfaces/PlantImagesHistoryData";

export const getPlants = async () => {
    const result = await plantsApi.get<{ plants: Plant[] }>(`/plants`);

    return result.data;
};

interface AddPlant {
    name: string;
    description?: string;
    image?: string | null;
    wateringReminderFrequency?: number;
}

export const addPlant = async ({
    name,
    description,
    image,
    wateringReminderFrequency,
}: AddPlant) => {
    return await plantsApi.post("/plants", {
        name,
        description,
        imageSrc: image,
        wateringReminderFrequency,
    });
};

interface EditPlant {
    id: string;
    name: string;
    description?: string;
    image?: string | null;
    wateringReminderFrequency?: number;
}

export const editPlant = async ({
    id,
    name,
    description,
    image,
    wateringReminderFrequency,
}: EditPlant) => {
    return await plantsApi.put(`/plants`, {
        id,
        name,
        description,
        imageSrc: image,
        wateringReminderFrequency,
    });
};

export const importPlant = async (shareId: string) => {
    return await plantsApi.post("/plants/import", {
        shareId,
    });
};

export const getImagesHistory = async (plantId: string) => {
    const { data } = await plantsApi.get<{
        imagesData: PlantImagesHistoryData;
    }>(`plants/history/images/${plantId}`);

    return data;
};

export const addImageToPlant = async (
    plantId: string,
    image?: string | null
) => {
    return await plantsApi.post("/plants/images", {
        plantId,
        image,
    });
};

export const deleteImageFromPlant = async (imageId: string) => {
    return await plantsApi.delete(`/plants/images/${imageId}`);
};

export const deletePlant = async (plantId: string) => {
    return await plantsApi.delete(`/plants/${plantId}`);
};

export const reportBug = async ({
    description,
    email,
}: {
    description: string;
    email?: string;
}) => {
    return await plantsApi.post<void>("/user/bug-report", {
        description,
        email,
    });
};
