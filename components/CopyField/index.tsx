import React, { useState } from "react";
import * as Clipboard from "expo-clipboard";
import i18n from "config/i18n";
import {
    ButtonWrapper,
    FieldContainer,
    FieldValue,
    Info,
    SuccessIcon,
} from "./styles";

const INFO_APPEAR_TIME_MS = 1000;

interface Props {
    value: string;
}

const CopyField = ({ value }: Props): JSX.Element => {
    const { t } = i18n;
    const [copied, setCopied] = useState(false);

    const onClick = async () => {
        await Clipboard.setStringAsync(value);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, INFO_APPEAR_TIME_MS);
    };

    return (
        <FieldContainer>
            <FieldValue>{value}</FieldValue>
            <ButtonWrapper onPress={onClick}>
                {copied ? (
                    <SuccessIcon
                        resizeMode="contain"
                        source={require("../../assets/success.png")}
                    />
                ) : (
                    <Info>{t("common.copy")}</Info>
                )}
            </ButtonWrapper>
        </FieldContainer>
    );
};

export default CopyField;
