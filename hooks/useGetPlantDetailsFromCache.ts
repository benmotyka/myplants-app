import { Plant } from "interfaces";
import { useEffect, useState } from "react";
import { usePlantsPersistentStore } from "store";

export const useGetPlantDetailsFromCache = (plantId: string) => {
  const [plant, setPlant] = useState<Plant>();
  const [isReminderChecked, setReminderChecked] = useState(false);
  const userPlants = usePlantsPersistentStore((state) => state.userPlants);

  useEffect(() => {
    const plant = userPlants.find((plant) => plant.id === plantId);
    setPlant(plant);
    setReminderChecked(!!plant?.wateringReminderFrequency);
  }, [userPlants]);

  return { plant, isReminderChecked, setReminderChecked };
};
