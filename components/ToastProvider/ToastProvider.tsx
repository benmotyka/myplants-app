import { useToastStore } from "../../newStore";
import React, { useEffect, useMemo } from "react";
import { Text } from "react-native";
import RNToast from "react-native-root-toast";
import { colors } from "styles/colors";

const ToastProvider = (): JSX.Element => {
  const { isToastShown, text, type, hideToast } = useToastStore(
    (store) => store
  );

  useEffect(() => {
    if (!isToastShown) return;

    const timeout = setTimeout(() => {
      hideToast();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isToastShown]);

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
      visible={isToastShown}
      position={40}
      backgroundColor={toastBackgruondColor}
    >
      <Text>{text}</Text>
    </RNToast>
  );
};

export default ToastProvider;
