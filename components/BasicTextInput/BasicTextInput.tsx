import React from "react";
import { Platform } from "react-native";

import { BasicTextInputProps } from "components/BasicTextInput/BasicTextInput.interface";
import {
  Input,
  InputWrapper,
  InputLabel,
  ErrorWrapper,
  ErrorText,
  ErrorContainer,
} from "components/BasicTextInput/BasicTextInput.styles";
import { AnimatePresence } from "moti";

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
        textAlignVertical="top" //in order to make multiline work correctny on android
        autoCapitalize="none"
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
      <AnimatePresence>
        <ErrorContainer>
          {error ? (
            <ErrorWrapper
              from={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
            >
              <ErrorText>{error}</ErrorText>
            </ErrorWrapper>
          ) : null}
        </ErrorContainer>
      </AnimatePresence>
    </InputWrapper>
  );
};

export default BasicTextInput;
