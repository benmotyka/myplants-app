import Toast from "react-native-toast-message";

interface ToastProps {
  type: "success" | "error" | "info";
  text1: string;
  text2?: string;
}

export const showToast = ({ text1, text2, type }: ToastProps) => {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime: 2000,
  });
};
