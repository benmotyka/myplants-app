import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "interfaces/RootStackParamList";
import Back from "components/Back";
import {
  ColumnCenterWrapper,
  ScreenContainer,
} from "styles/shared";
import i18n from "config/i18n";
import BasicSwitch from "components/BasicSwitch";
import { AppTheme, useAppConfigStore } from "store";

type SettingsAppProps = NativeStackScreenProps<
  RootStackParamList,
  "settingsApp"
>;

const { t } = i18n;

const SettingsApp = ({ navigation }: SettingsAppProps): JSX.Element => {
  const appConfig = useAppConfigStore.persistent((state) => state);
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
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default SettingsApp;
