import plantsApi from "config/api/plants";

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
