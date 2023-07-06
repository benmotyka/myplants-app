import plantsApi from "config/api/plants";
import { UserInfo } from "interfaces/index";

interface UpdateUserSettings {
  pushNotificationsEnabled: boolean;
}

export const updateUserSettings = async ({
  pushNotificationsEnabled,
}: UpdateUserSettings) => {
  return await plantsApi.put("/user/settings", {
    pushNotificationsEnabled,
  });
};

interface UpdateUserInfo extends UserInfo {}

export const updateUserInfo = async (payload: UpdateUserInfo) => {
  return await plantsApi.put("/user/info", payload);
};
