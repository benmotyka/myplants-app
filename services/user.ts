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

export const upsertPushNotificationsToken = async (token: string) => {
    return await plantsApi.put("/user/notifications", token)
}