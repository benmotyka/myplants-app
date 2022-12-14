import React, { useState } from "react";
import { MotiView, AnimatePresence } from "moti";
import * as Clipboard from "expo-clipboard";
import i18n from "config/i18n";
import {
    ButtonWrapper,
    FieldContainer,
    FieldValue,
    Info,
    InfoWrapper,
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
        <>
            <FieldContainer>
                <FieldValue>{value}</FieldValue>
                <ButtonWrapper onPress={onClick}>
                    <Info>{t("common.copy")}</Info>
                </ButtonWrapper>
            </FieldContainer>
            <InfoWrapper>
                <AnimatePresence>
                    {copied ? (
                        <MotiView
                            from={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                        >
                            <Info>{t("components.copyField.successInfo")}</Info>
                        </MotiView>
                    ) : null}
                </AnimatePresence>
            </InfoWrapper>
        </>
    );
};

export default CopyField;
