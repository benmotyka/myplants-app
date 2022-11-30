import plantsApi from "config/api/plants";

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
