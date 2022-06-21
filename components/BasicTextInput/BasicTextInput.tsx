import React from "react";
import { BasicTextInputProps } from "./BasicTextInput.interface";
import { Input, InputWrapper, InputLabel } from "./BasicTextInput.styles";

const TEXTAREA_NUMBER_OF_LINES = 4;

const BasicTextInput = ({
  placeholder,
  value,
  label,
  onChangeText,
  onBlur,
  textarea,
  hideInput
}: BasicTextInputProps): JSX.Element => {
  return (
    <InputWrapper>
    <InputLabel>{label}</InputLabel>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        multiline={textarea}
        numberOfLines={textarea ? TEXTAREA_NUMBER_OF_LINES : 1}
        secureTextEntry={hideInput}
      />
    </InputWrapper>
  );
};

export default BasicTextInput;
