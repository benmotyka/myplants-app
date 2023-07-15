import React from "react";
import {
  ErrorToast,
  InfoToast,
  SuccessToast,
  ToastProps,
} from "react-native-toast-message";
import { useAppConfigStore } from "store/index";
import { darkTheme, lightTheme } from "styles/theme";

export const Info = (props: ToastProps): JSX.Element => {
  const appTheme = useAppConfigStore.persistent((state) => state.theme);
  const currentTheme = appTheme === "dark" ? darkTheme : lightTheme;

  return (
    <InfoToast
      {...props}
      style={{ borderLeftColor: currentTheme.primary }}
      contentContainerStyle={{
        backgroundColor: currentTheme.primaryLight,
        minHeight: 50,
      }}
      text1Style={{
        fontSize: 20,
        fontWeight: "400",
        color: currentTheme.white,
      }}
      text2Style={{
        fontSize: 16,
        color: currentTheme.white,
        marginTop: 5,
      }}
    />
  );
};

export const Success = (props: ToastProps): JSX.Element => {
  const appTheme = useAppConfigStore.persistent((state) => state.theme);
  const currentTheme = appTheme === "dark" ? darkTheme : lightTheme;

  return (
    <SuccessToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{
        backgroundColor: currentTheme.success,
        minHeight: 50,
      }}
      text1Style={{
        fontSize: 20,
        fontWeight: "400",
        color: currentTheme.white,
      }}
    />
  );
};

export const Error = (props: ToastProps): JSX.Element => {
  const appTheme = useAppConfigStore.persistent((state) => state.theme);
  const currentTheme = appTheme === "dark" ? darkTheme : lightTheme;

  return (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: currentTheme.warning }}
      contentContainerStyle={{
        paddingHorizontal: 10,
        backgroundColor: currentTheme.warning,
        opacity: 0.8,
        minHeight: 50,
      }}
      text1Style={{
        fontSize: 20,
        fontWeight: "400",
        color: currentTheme.white,
      }}
      text2Style={{
        fontSize: 16,
        color: currentTheme.white,
        marginTop: 5,
      }}
    />
  );
};
