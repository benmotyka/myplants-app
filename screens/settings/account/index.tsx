import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "App";
import BasicButton from "components/BasicButton/BasicButton";
import SettingsItem from "components/Settings/SettingsItem";
import Back from "components/Back/Back";
import { SettingsSection } from "components/Settings/Settings.styles";
import { ColumnCenterWrapper, ScreenContainer } from "styles/shared";
import i18n from "../../../i18n";
import SettingsHeader from "components/Settings/SettingsHeader";

type SettingsAccountProps = NativeStackScreenProps<
  RootStackParamList,
  "settingsAccount"
>;

const { t } = i18n;

const SettingsAccount = ({ navigation }: SettingsAccountProps): JSX.Element => {
  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <SettingsSection>
        <SettingsHeader text={t("pages.settings.myAccount")} />
          <SettingsItem>
            <BasicButton
              onPress={() => {
                navigation.navigate("settingsAccountConfirmEmail");
              }}
              text={t("pages.settings.account.confirmEmail.label")}
              important
            />
          </SettingsItem>
          <SettingsItem>
            <BasicButton
              onPress={() => {
                navigation.navigate("settingsAccountChangePassword");
              }}
              text={t("pages.settings.account.changePassword.label")}
            />
          </SettingsItem>
        </SettingsSection>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default SettingsAccount;
