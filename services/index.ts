import plantsApi from "config/api/plants";
import { Plant } from "interfaces/Plant";
import { PlantImagesHistoryData } from "interfaces/PlantImagesHistoryData";
import { WateringData } from "interfaces/WateringData";

export const getPlants = async () => {
  const result = await plantsApi.get<{ plants: Plant[] }>(`/plants`);

  return result.data;
};

export const getWateringHistory = async (plantId: string) => {
  const result = await plantsApi.get<{ waterings: WateringData }>(
    `watering/${plantId}`
  );

  return result.data;
};

export const waterPlant = async (plantId: string) => {
  const result = await plantsApi.post(`/watering`, {
    plantId,
  });

  return result.data.id;
};

export const cancelWatering = async (wateringId: string) => {
  const result = await plantsApi.delete(`/watering/${wateringId}`);

  return result;
};

export const updateUserSettings = async ({
  pushNotificationsEnabled,
}: {
  pushNotificationsEnabled: boolean;
}) => {
  const result = await plantsApi.put("/user/settings", {
    pushNotificationsEnabled,
  });

  return result;
};

export const addPlant = async ({
  name,
  description,
  image,
  wateringReminderFrequency,
}: {
  name: string;
  description?: string;
  image?: string | null;
  wateringReminderFrequency?: number;
}) => {
  const result = await plantsApi.post("/plants", {
    name,
    description,
    imageSrc: image,
    wateringReminderFrequency,
  });

  return result;
};

export const editPlant = async ({
  id,
  name,
  description,
  image,
  wateringReminderFrequency,
}: {
  id: string;
  name: string;
  description?: string;
  image?: string | null;
  wateringReminderFrequency?: number;
}) => {
  const result = await plantsApi.put(`/plants`, {
    id,
    name,
    description,
    imageSrc: image,
    wateringReminderFrequency,
  });
  return result;
};
export const importPlant = async (shareId: string) => {
  const result = await plantsApi.post("/plants/import", {
    shareId,
  });

  return result;
};

export const getImagesHistory = async (plantId: string) => {
  const result = await plantsApi.get<{
    imagesData: PlantImagesHistoryData;
  }>(`plants/history/images/${plantId}`);

  return result.data;
};

export const addImageToPlant = async (
  plantId: string,
  image?: string | null
) => {
  const result = await plantsApi.post("/plants/images", {
    plantId,
    image,
  });

  return result;
};

export const deletePlant = async (plantId: string) => {
  const result = await plantsApi.delete(`/plants/${plantId}`);

  return result;
};
