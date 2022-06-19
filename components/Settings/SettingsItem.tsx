import React from "react";
import { SettingsItemProps } from "./Settings.interface";
import { ItemWrapper, ItemText } from "./Settings.styles";

const SettingsItem = ({ text, link }: SettingsItemProps): JSX.Element => {
  return (
    <ItemWrapper>
      <ItemText>{text}</ItemText>
    </ItemWrapper>
  );
};

export default SettingsItem;
