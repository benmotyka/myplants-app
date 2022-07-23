import React from "react";

import { SettingsItemProps } from "components/Settings/Settings.interface";
import { ItemWrapper } from "components/Settings/Settings.styles";

const SettingsItem = ({ children }: SettingsItemProps): JSX.Element => {
  return (
    <ItemWrapper>
      {children}
    </ItemWrapper>
  );
};

export default SettingsItem;
