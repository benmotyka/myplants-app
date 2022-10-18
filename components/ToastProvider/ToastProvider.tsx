import { AnimatePresence } from "moti";
import React, { useEffect, useMemo } from "react";
import { colors } from "styles/colors";
import {
  ToastContainer,
  ToastText,
  ToastWrapper,
} from "./ToastProvider.styles";
import { useToastStore } from "../../newStore";

const TOAST_DURATION = 1500; // ms

const ToastProvider = (): JSX.Element => {
  const { isToastShown, text, type, hideToast } = useToastStore(
    (store) => store
  );

  useEffect(() => {
    if (!isToastShown) return;

    const timeout = setTimeout(() => {
      hideToast();
    }, TOAST_DURATION);

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
    <ToastContainer>
      <AnimatePresence>
        {isToastShown ? (
          <ToastWrapper
            backgroundColor={toastBackgruondColor}
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
          </ToastWrapper>
        ) : null}
      </AnimatePresence>
    </ToastContainer>
  );
};

export default ToastProvider;
