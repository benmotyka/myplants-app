import create from "zustand";

export type ToastTypes = "error" | "success" | "info";

interface ToastState {
  text: string;
  type: ToastTypes;
  isToastShown: boolean;
  showToast: ({ text, type }: { text: string; type: ToastTypes }) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  text: "",
  type: "info",
  isToastShown: false,
  showToast: ({ text, type }) => set({ text, type, isToastShown: true }),
  hideToast: () => set({ text: "", isToastShown: false }),
}));
