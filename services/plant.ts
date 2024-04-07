import plantsApi from "config/api/plants";
import { Plant, PlantImagesHistoryData } from "interfaces";

export const getPlants = async () => {
  const { data } = await plantsApi.get<{ plants: Plant[] }>(`/plants`);

  return data;
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
    return plantsApi.post("/plants", {
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
  return plantsApi.put(`/plants`, {
    id,
    name,
    description,
    imageSrc: image,
    wateringReminderFrequency,
  });
};

export const importPlant = async (shareId: string) => {
  return plantsApi.post("/plants/import", {
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
  return plantsApi.post("/plants/images", {
    plantId,
    image,
  });
};

export const deleteImageFromPlant = async (imageId: string) => {
  return plantsApi.delete(`/plants/images/${imageId}`);
};

export const deletePlant = async (plantId: string) => {
  return plantsApi.delete(`/plants/${plantId}`);
};

export const reportBug = async ({
  description,
  email,
}: {
  description: string;
  email?: string;
}) => {
  return plantsApi.post<void>("/user/bug-report", {
    description,
    email,
  });
};
