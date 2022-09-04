import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App";
import Back from "components/Back/Back";
import BasicButton from "components/BasicButton/BasicButton";
import { SettingsSection } from "components/Settings/Settings.styles";
import SettingsHeader from "components/Settings/SettingsHeader";
import SettingsItem from "components/Settings/SettingsItem";
import { ColumnCenterWrapper, ScreenContainer } from "styles/shared";
import i18n from "../../i18n";

type SettingsProps = NativeStackScreenProps<RootStackParamList, "settings">;

const { t } = i18n;

const Settings = ({ navigation }: SettingsProps): JSX.Element => {
  return (
    <ScreenContainer>
      <Back navigation={navigation} />
      <ColumnCenterWrapper>
        <SettingsSection>
          <SettingsHeader text={t("pages.settings.header")} />
          <SettingsItem>
            <BasicButton
              onPress={() => {
                navigation.navigate("settingsNotifications");
              }}
              text={t("pages.settings.notificationsHeader")}
            />
          </SettingsItem>
          <SettingsItem>
            <BasicButton
              onPress={() => {
                navigation.navigate("settingsAccount");
              }}
              text={t("pages.settings.myAccount")}
            />
          </SettingsItem>
        </SettingsSection>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default Settings;
