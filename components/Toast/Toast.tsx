import React, { useEffect, useMemo, useState } from "react";
import RNToast from "react-native-root-toast";
import { colors } from "styles/colors";

export type ToastTypes = "error" | "success" | "info";

export interface ToastProps {
  text: string;
  type: ToastTypes;
}

const Toast = ({ text, type = "info" }: ToastProps): JSX.Element => {
  const [showToast, setShowToast] = useState(false);

  //   @TODO: add redux state
  useEffect(() => {
    setTimeout(() => {
      setShowToast(true);
    }, 500);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  });

  const toastBackgruondColor = useMemo(() => {
    switch (type) {
      case "success":
        return colors.success;
      case "error":
        return colors.alert;
      case "info":
        return colors.important;
    }
  }, [type]);

  return (
    <RNToast
      visible={showToast}
      position={40}
      backgroundColor={toastBackgruondColor}
    ></RNToast>
  );
};

export default Toast;
