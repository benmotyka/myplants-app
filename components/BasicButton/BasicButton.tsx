import React from "react";
import { BasicButtonProps } from "./BasicButton.interface";
import { ButtonWrapper, ButtonText } from "./BasicButton.styles";

const BasicButton = ({ text, onPress, warning, important }: BasicButtonProps): JSX.Element => {
  return (
    <ButtonWrapper onPress={onPress} warning={warning} important={important}>
        <ButtonText warning={warning} important={important}>{text}</ButtonText>
    </ButtonWrapper>
  );
};

export default BasicButton;
