import plantsApi from "config/api/plants";
import { WateringData } from "interfaces/WateringData";

export const getWateringHistory = async (plantId: string) => {
  const { data } = await plantsApi.get<{ waterings: WateringData }>(
    `watering/${plantId}`
  );

  return data;
};

export const cancelWatering = async (wateringId: string) => {
  return await plantsApi.delete(`/watering/${wateringId}`);
};

export const waterPlant = async (plantId: string) => {
  const { data } = await plantsApi.post(`/watering`, {
    plantId,
  });

  return data.id;
};
