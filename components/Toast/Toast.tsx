import React from "react";
import { TouchableOpacity } from "react-native";
import { AnimatePresence } from "moti";
import { useTheme } from "styled-components/native";

import {
  ToastCancelText,
  ToastContainer,
  ToastText,
  ToastWrapper,
} from "./Toast.styles";
import { useToastStore, ToastState } from "store";
import i18n from "../../i18n";

const Toast = ({
  text,
  type,
  onCancel,
}: Pick<ToastState, "text" | "type" | "onCancel">): JSX.Element => {
  const { isToastShown } = useToastStore((store) => store);
  const theme = useTheme();
  const { t } = i18n;

  const toastBackgruondColor = () => {
    switch (type) {
      case "success":
        return theme.success;
      case "error":
        return theme.warning;
      default:
        return theme.primary;
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
