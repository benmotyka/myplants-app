import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "App";
import Back from "components/Back/Back";
import {
  ColumnCenterWrapper,
  ScreenContainer,
  Description,
} from "styles/shared";
import i18n from "../../i18n";
import BasicSwitch from "components/BasicSwitch/BasicSwitch";
import { AppTheme, useAppConfigStore } from "store";

type SettingsAppProps = NativeStackScreenProps<
  RootStackParamList,
  "settingsApp"
>;

const { t } = i18n;

const SettingsApp = ({ navigation }: SettingsAppProps): JSX.Element => {
  const appConfig = useAppConfigStore((state) => state);
  const [theme, setTheme] = useState<AppTheme>(appConfig.theme);

  const handleSwitch = ({ theme }: { theme: AppTheme }) => {
    appConfig.setTheme(theme)
  };

  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <BasicSwitch
          label={t("pages.settings.app.manageTheme")}
          leftItemLabel={t("pages.settings.app.lightTheme")}
          rightItemLabel={t("pages.settings.app.darkTheme")}
          onClickLeftItem={() => {
            handleSwitch({ theme: "light" });
            setTheme("light");
          }}
          onClickRightItem={() => {
            handleSwitch({ theme: "dark" });
            setTheme("dark");
          }}
          activeItem={theme === "light" ? "left" : "right"}
        />
        <Description style={{ marginTop: 10 }}></Description>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default SettingsApp;
