import React from "react";
import { BasicButtonProps } from "./BasicButton.interface";
import { ButtonWrapper, ButtonText } from "./BasicButton.styles";

const BasicButton = ({ text, onPress }: BasicButtonProps): JSX.Element => {
  return (
    <ButtonWrapper onPress={onPress}>
        <ButtonText>{text}</ButtonText>
    </ButtonWrapper>
  );
};

export default BasicButton;
