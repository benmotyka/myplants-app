import React from "react";

import { BasicButtonProps } from "components/BasicButton/BasicButton.interface";
import {
  ButtonWrapper,
  ButtonText,
} from "components/BasicButton/BasicButton.styles";

const BasicButton = ({
  text,
  onPress,
  warning,
  important,
  disabled,
}: BasicButtonProps): JSX.Element => {
  return (
    <ButtonWrapper
      disabled={disabled}
      onPress={disabled ? () => null : onPress}
      warning={warning}
      important={important}
    >
      <ButtonText warning={warning} important={important} disabled={disabled}>
        {text}
      </ButtonText>
    </ButtonWrapper>
  );
};

export default BasicButton;
