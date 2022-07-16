import React from "react";
import { SettingsHeaderProps } from "components/Settings/Settings.interface";
import { HeaderWrapper, HeaderText } from "components/Settings/Settings.styles";

const SettingsHeader = ({ text }: SettingsHeaderProps): JSX.Element => {
  return (
    <HeaderWrapper>
      <HeaderText>{text}</HeaderText>
    </HeaderWrapper>
  );
};

export default SettingsHeader;
