import plantsApi from "../../config/api/plants";
import { IPlant } from "../../interfaces/IPlant";
import { getItem, removeItem } from "../../store/storage";

export const getUserPlants = async ({
  navigation,
}: {
  navigation: any;
}): Promise<IPlant[]> => {
  try {
    const jwt = await getItem("jwt");
    const { data } = await plantsApi.get<IPlant[]>("plants", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  } catch (error) {
    switch (error) {
      case "Unauthorized":
        await removeItem("jwt");
        navigation.navigate("login");
        break;
    }
    throw new Error("error");
  }
};
