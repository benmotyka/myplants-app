import OToast from "react-native-root-toast";
import { colors } from "styles/colors";

export type ToastTypes = "error" | "success" | "info" 

export interface ToastProps {
  text: string;
  type: ToastTypes
}

const TOAST_SETTINGS = {
  duration: 1500,
  position: 40,
};

export default (text: string, type: ToastTypes = 'info') => {
  const getToastBackgruondColor = (type: ToastTypes) => {
    switch (type) {
      case "success":
        return colors.success;
      case "error":
        return colors.alert;
      case "info":
        return colors.important;
    }
  };

  return OToast.show(text, {
    ...TOAST_SETTINGS,
    backgroundColor: getToastBackgruondColor(type),
    textStyle: {
      fontSize: 20,
      paddingHorizontal: 10
    }
  });
};

