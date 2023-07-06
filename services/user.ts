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

interface UpdateUserInfo {
  deviceLanguage: string;
  pushNotificationToken?: string;
  deviceInfo: string | null;
}

export const updateUserInfo = async (payload: UpdateUserInfo) => {
  return await plantsApi.put("/user/info", payload);
};
