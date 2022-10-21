import React, { ReactElement, useEffect } from "react";
import Toast from "components/Toast/Toast";
import RootSiblings from "react-native-root-siblings";
import { useToastStore } from "../newStore";

interface ToastProviderProps {
  children: ReactElement | ReactElement[];
}

const TOAST_DURATION = 1500; // ms

const ToastProvider = ({ children }: ToastProviderProps): JSX.Element => {
  const { hideToast, text, type, onCancel } =
    useToastStore((store) => store);

  useEffect(() => {
    const toast = new RootSiblings(<Toast />);

    const timeout = setTimeout(() => {
      hideToast();
      toast.destroy();
    }, TOAST_DURATION);
    
    return () => clearTimeout(timeout);
  }, [text, type, onCancel]);

  return (
    <>
      <Toast />
      {children}
    </>
  );
};

export default ToastProvider;
