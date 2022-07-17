import OToast from "react-native-root-toast";
import { colors } from "styles/colors";

export type ToastTypes = "error" | "success";

export interface ToastProps {
  text: string;
  type: ToastTypes
}

const TOAST_SETTINGS = {
  duration: 1500,
  position: 50,
};

export default ({ text, type }: ToastProps) => {
  const getToastBackgruondColor = (type: ToastTypes) => {
    switch (type) {
      case "error":
        return colors.alert;
      case "success":
        return colors.success;
    }
  };

  return OToast.show(text, {
    ...TOAST_SETTINGS,
    backgroundColor: getToastBackgruondColor(type),
  });
};

