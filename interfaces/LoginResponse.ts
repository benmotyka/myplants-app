import { UserSettings } from "./UserSettings";

export interface LoginResponse {
    accessToken: string;
    userSettings: UserSettings
  }