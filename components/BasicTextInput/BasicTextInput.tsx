import React from "react";
import { Input, InputWrapper } from "./BasicTextInput.styles";

const BasicTextInput = ({ placeholder}: {placeholder?: string}): JSX.Element => {
  return (
        <InputWrapper>
        <Input placeholder={placeholder}/>
        </InputWrapper>
  );
};

export default BasicTextInput;
