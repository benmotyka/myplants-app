import React from "react";
import { MotiView, AnimatePresence } from "moti";
import {
  ButtonWrapper,
  FieldContainer,
  FieldValue,
  Info,
  InfoWrapper,
} from "./CopyField.styles";

import i18n from "../../i18n";

const INFO_APPEAR_TIME_MS = 1000;

const CopyField = ({ value }: { value: string }): JSX.Element => {
  const { t } = i18n;
  const [copied, setCopied] = React.useState(false);

  const onClick = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, INFO_APPEAR_TIME_MS);
  };
  return (
    <>
      <FieldContainer>
        <FieldValue> {value}</FieldValue>
        <ButtonWrapper onPress={onClick}>{t("common.copy")}</ButtonWrapper>
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
