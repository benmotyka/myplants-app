import React from "react";
import { Platform } from "react-native";
import { BasicTextInputProps } from "./BasicTextInput.interface";
import {
  Input,
  InputWrapper,
  InputLabel,
  ErrorWrapper,
} from "./BasicTextInput.styles";

const TEXTAREA_NUMBER_OF_LINES = 4;
const IOS_LINE_HEIGHT_PX = 20;

const BasicTextInput = ({
  placeholder,
  value,
  label,
  onChangeText,
  onBlur,
  textarea,
  hideInput,
  error,
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
        secureTextEntry={hideInput}
        errorBorder={!!error}
        numberOfLines={textarea ? TEXTAREA_NUMBER_OF_LINES : 1}
        //numberOfLines doesn't work for iOS, then:
        style={
          Platform.OS === "ios" && textarea
            ? { height: TEXTAREA_NUMBER_OF_LINES * IOS_LINE_HEIGHT_PX }
            : null
        }
      />
      <ErrorWrapper>{error}</ErrorWrapper>
    </InputWrapper>
  );
};

export default BasicTextInput;
