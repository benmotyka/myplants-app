import create from "zustand";

export type ToastTypes = "error" | "success" | "info";

interface ToastState {
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
