import React from "react";
import { SettingsItemProps } from "./Settings.interface";
import { ItemWrapper } from "./Settings.styles";

const SettingsItem = ({ children }: SettingsItemProps): JSX.Element => {
  return (
    <ItemWrapper>
      {children}
    </ItemWrapper>
  );
};

export default SettingsItem;
