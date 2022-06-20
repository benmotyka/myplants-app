import React from "react";
import { BasicButtonProps } from "./BasicButton.interface";
import { ButtonWrapper, ButtonText } from "./BasicButton.styles";

const BasicButton = ({ text, onPress, warning }: BasicButtonProps): JSX.Element => {
  return (
    <ButtonWrapper onPress={onPress} warning={warning}>
        <ButtonText warning={warning}>{text}</ButtonText>
    </ButtonWrapper>
  );
};

export default BasicButton;
