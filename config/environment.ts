import Constants from "expo-constants";

export const apiUrl = Constants.manifest?.extra?.apiUrl;

export const sentryDsn = Constants.manifest?.extra?.sentryDsn;

export const basicAuthUsername = Constants.manifest?.extra?.basicAuthUsername;

export const basicAuthPassword = Constants.manifest?.extra?.basicAuthPassword;
