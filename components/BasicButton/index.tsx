import React from "react";

import { ButtonWrapper, ButtonText } from "./styles";

interface Props {
  text: string;
  onPress: () => void;
  warning?: boolean;
  important?: boolean;
  disabled?: boolean;
}

const BasicButton = ({
  text,
  onPress,
  warning,
  important,
  disabled,
}: Props): JSX.Element => {
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
