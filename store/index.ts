import { Appearance } from "react-native";
import { StateCreator, create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, PersistOptions } from "zustand/middleware";
import { Plant, UserInfo } from "interfaces";

type ToastTypes = "error" | "success" | "info";

export interface ToastState {
  text: string;
  type: ToastTypes;
  isToastShown: boolean;
  onCancel: (() => void) | null;
  showToast: ({
    text,
    type,
    onCancel,
  }: {
    text: string;
    type: ToastTypes;
    onCancel?: () => void;
  }) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  text: "",
  type: "info",
  isToastShown: false,
  onCancel: null,
  showToast: ({ text, type, onCancel }) =>
    set({ text, type, onCancel, isToastShown: true }),
  hideToast: () => set({ text: "", isToastShown: false }),
}));

interface UserPlantsState {
  userPlants: Plant[];
  setUserPlants: (plants: Plant[]) => void;
}

type PlantsPersist = (
  config: StateCreator<UserPlantsState>,
  options: PersistOptions<UserPlantsState>
) => StateCreator<UserPlantsState>;

export const usePlantsPersistentStore = create<UserPlantsState>(
  (persist as unknown as PlantsPersist)(
    (set) => ({
      userPlants: [],
      setUserPlants: (userPlants) => set({ userPlants }),
    }),
    {
      name: "user-plants-storage",
      getStorage: () => AsyncStorage,
    }
  )
);

interface UserInfoState {
  data: UserInfo;
  setUserInfo: ({
    deviceInfo,
    deviceLanguage,
    pushNotificationToken,
  }: UserInfo) => void;
}

type UserInfoPersist = (
  config: StateCreator<UserInfoState>,
  options: PersistOptions<UserInfoState>
) => StateCreator<UserInfoState>;

export const useUserInfoPersistentStore = create<UserInfoState>(
  (persist as unknown as UserInfoPersist)(
    (set) => ({
      data: {
        deviceInfo: "",
        deviceLanguage: "",
        pushNotificationToken: "",
      },
      setUserInfo: (data) => set({ data }),
    }),
    {
      name: "user-info-storage",
      getStorage: () => AsyncStorage,
    }
  )
);

export type AppTheme = "light" | "dark";

interface AppConfigEphemeralState {
  isClosedUpdateModal: boolean;
  setIsClosedUpdateModal: (value: boolean) => void;
}

interface AppConfigPersistentState {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  isRateAppModalShown: boolean;
  setRateAppModalShown: (state: boolean) => void;
}

type AppConfigPersist = (
  config: StateCreator<AppConfigPersistentState>,
  options: PersistOptions<AppConfigPersistentState>
) => StateCreator<AppConfigPersistentState>;

export const useAppConfigStore = {
  persistent: create<AppConfigPersistentState>(
    (persist as unknown as AppConfigPersist)(
      (set) => ({
        theme: Appearance.getColorScheme() === "dark" ? "dark" : "light",
        setTheme: (theme) => set({ theme }),
        isRateAppModalShown: false,
        setRateAppModalShown: (state) => set({ isRateAppModalShown: state }),
      }),
      {
        name: "app-config-storage",
        getStorage: () => AsyncStorage,
      }
    )
  ),
  ephemeral: create<AppConfigEphemeralState>((set) => ({
    isClosedUpdateModal: false,
    setIsClosedUpdateModal: (value) => set({ isClosedUpdateModal: value }),
  })),
};

interface ModalsState {
  isHelpModalOpen: boolean;
  setHelpModalState: (state: boolean) => void;
}

export const useModalsStore = create<ModalsState>((set) => ({
  isHelpModalOpen: false,
  setHelpModalState: (state) => set({ isHelpModalOpen: state }),
}));
