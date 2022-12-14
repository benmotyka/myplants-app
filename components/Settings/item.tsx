import React, { ReactElement } from "react";

import { ItemWrapper } from "components/Settings/styles";

export interface Props {
    children: ReactElement;
}

const SettingsItem = ({ children }: Props): JSX.Element => {
    return <ItemWrapper>{children}</ItemWrapper>;
};

export default SettingsItem;
