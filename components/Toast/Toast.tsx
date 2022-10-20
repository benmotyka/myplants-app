import { AnimatePresence } from "moti";
import React, { useEffect } from "react";
import { colors } from "styles/colors";
import {
  ToastCancelText,
  ToastContainer,
  ToastText,
  ToastWrapper,
} from "./Toast.styles";
import { useToastStore } from "../../newStore";
import { TouchableOpacity } from "react-native";
import i18n from "../../i18n";

const TOAST_DURATION = 1500; // ms

const Toast = (): JSX.Element => {
  const { isToastShown, text, type, hideToast, onCancel } = useToastStore(
    (store) => store
  );
  const { t } = i18n;

  useEffect(() => {
    if (!isToastShown) return;

    const timeout = setTimeout(() => {
      hideToast();
    }, TOAST_DURATION);

    return () => clearTimeout(timeout);
  }, [isToastShown]);

  const toastBackgruondColor = () => {
    switch (type) {
      case "success":
        return colors.success;
      case "error":
        return colors.alert;
      case "info":
        return colors.important;
    }
  };

  return (
    <ToastContainer>
      <AnimatePresence>
        {isToastShown ? (
          <ToastWrapper
            backgroundColor={toastBackgruondColor()}
            from={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.9,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <ToastText>{text}</ToastText>
            {onCancel ? (
              <TouchableOpacity onPress={onCancel}>
                <ToastCancelText>{t("common.cancel")}</ToastCancelText>
              </TouchableOpacity>
            ) : null}
          </ToastWrapper>
        ) : null}
      </AnimatePresence>
    </ToastContainer>
  );
};

export default Toast;
