import React from "react";
import { HeaderWrapper, HeaderText } from "components/Settings/styles";

interface Props {
  text: string;
}

const SettingsHeader = ({ text }: Props): JSX.Element => {
  return (
    <HeaderWrapper>
      <HeaderText>{text}</HeaderText>
    </HeaderWrapper>
  );
};

export default SettingsHeader;
