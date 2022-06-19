import React from "react";
import { SettingsHeaderProps } from "./Settings.interface";
import { HeaderWrapper, HeaderText } from "./Settings.styles";

const SettingsHeader = ({ text }: SettingsHeaderProps): JSX.Element => {
  return (
    <HeaderWrapper>
      <HeaderText>{text}</HeaderText>
    </HeaderWrapper>
  );
};

export default SettingsHeader;
