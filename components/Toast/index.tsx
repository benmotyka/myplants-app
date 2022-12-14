import React from "react";
import { TouchableOpacity } from "react-native";
import { AnimatePresence } from "moti";
import { useTheme } from "styled-components/native";

import { useToastStore, ToastState } from "store";
import { ToastCancelText, ToastText, ToastWrapper } from "./styles";
import i18n from "config/i18n";

type Props = Pick<ToastState, "text" | "type" | "onCancel">;

const Toast = ({ text, type, onCancel }: Props): JSX.Element => {
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
                            <ToastCancelText>
                                {t("common.cancel")}
                            </ToastCancelText>
                        </TouchableOpacity>
                    ) : null}
                </ToastWrapper>
            ) : null}
        </AnimatePresence>
    );
};

export default Toast;
