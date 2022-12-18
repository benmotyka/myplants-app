import { Appearance } from "react-native";
import create, { StateCreator } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, PersistOptions } from "zustand/middleware";

import { Plant } from "interfaces/Plant";

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

export const usePlantsStore = create<UserPlantsState>((set) => ({
    userPlants: [],
    setUserPlants: (userPlants) => set({ userPlants }),
}));

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
                theme:
                    Appearance.getColorScheme() === "dark" ? "dark" : "light",
                setTheme: (theme) => set({ theme }),
                isRateAppModalShown: false,
                setRateAppModalShown: (state) =>
                    set({ isRateAppModalShown: state }),
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
