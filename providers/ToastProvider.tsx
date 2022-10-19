import React, { ReactElement } from "react";
import Toast from "components/Toast/Toast";

interface ToastProviderProps {
  children: ReactElement | ReactElement[];
}

const ToastProvider = ({ children }: ToastProviderProps): JSX.Element => {
  return (
    <>
      <Toast />
      {children}
    </>
  );
};

export default ToastProvider;
