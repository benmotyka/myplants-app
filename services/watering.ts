import plantsApi from "config/api/plants";
import { WateringData } from "interfaces/WateringData";

export const getWateringHistory = async (plantId: string) => {
  const result = await plantsApi.get<{ waterings: WateringData }>(
    `watering/${plantId}`
  );

  return result.data;
};

export const cancelWatering = async (wateringId: string) => {
  const result = await plantsApi.delete(`/watering/${wateringId}`);

  return result;
};



export const waterPlant = async (plantId: string) => {
  const result = await plantsApi.post(`/watering`, {
    plantId,
  });

  return result.data.id;
};

