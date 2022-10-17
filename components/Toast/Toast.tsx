import React, { useEffect, useMemo, useRef } from "react";
import { Text } from "react-native";
import RNToast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { notificationAction } from "store/actions";
import { State } from "store/reducers";
import { colors } from "styles/colors";

export type ToastTypes = "error" | "success" | "info";

export interface ToastProps {
  text: string;
  type?: ToastTypes;
}

const Toast = ({ text, type = "info" }: ToastProps): JSX.Element => {
  const { showToast } = useSelector((state: State) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!showToast) return;

    const timeout = setTimeout(() => {
      dispatch(notificationAction.hideToast());
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showToast]);

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
    >
      <Text>{text}</Text>
    </RNToast>
  );
};

export default Toast;
