import { Plant } from "interfaces/Plant";
import { useEffect, useState } from "react";
import { usePlantsStore } from "store";

export const useGetPlantDetailsFromCache = (plantId: string) => {
  const [plant, setPlant] = useState<Plant>();
  const [isReminderChecked, setReminderChecked] = useState(false);
  const userPlants = usePlantsStore((state) => state.userPlants);

  useEffect(() => {
    const plant = userPlants.find((plant) => plant.id === plantId);
    setPlant(plant);
    setReminderChecked(!!plant?.wateringReminderFrequency);
  }, [userPlants]);

  return { plant, isReminderChecked, setReminderChecked };
};
