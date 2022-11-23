import React, { ReactElement, useEffect } from "react";
import RootSiblings from "react-native-root-siblings";
import Toast from "components/Toast";
import { useToastStore } from "store";

interface ToastProviderProps {
  children: ReactElement | ReactElement[];
}

const TOAST_DURATION = 3500; // ms

const ToastProvider = ({ children }: ToastProviderProps): JSX.Element => {
  const { hideToast, text, type, onCancel, isToastShown } = useToastStore(
    (store) => store
  );

  useEffect(() => {
    if (!isToastShown) return;

    const toast = new RootSiblings(<Toast text={text} type={type} onCancel={onCancel} />);

    const timeout = setTimeout(() => {
      hideToast();
      setTimeout(() => {
        toast.destroy();
        clearTimeout(timeout);
      }, 1000);
    }, TOAST_DURATION);

    return () => {
      clearTimeout(timeout);
      setTimeout(() => {
        toast.destroy();
      }, 1000);
    };
  }, [text, type, onCancel]);

  return <>{children}</>;
};

export default ToastProvider;
