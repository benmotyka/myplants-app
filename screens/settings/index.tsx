import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import { RootStackParamList } from "../../App";
import Back from "components/Back/Back";
import BasicButton from "components/BasicButton/BasicButton";
import BasicModal from "components/BasicModal/BasicModal";
import {
  ModalHeader,
  ModalItem,
} from "components/BasicModal/BasicModal.styles";
import { SettingsSection } from "components/Settings/Settings.styles";
import SettingsHeader from "components/Settings/SettingsHeader";
import SettingsItem from "components/Settings/SettingsItem";
import { userAction } from "store/actions";
import { ColumnCenterWrapper, ScreenContainer } from "styles/shared";
import i18n from "../../i18n";

type SettingsProps = NativeStackScreenProps<RootStackParamList, "settings">;

const { t } = i18n;

const Settings = ({ navigation }: SettingsProps): JSX.Element => {
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(userAction.removeUserDetails());
    navigation.navigate("login");
  };

  return (
    <ScreenContainer>
      <Back navigation={navigation} />
      <ColumnCenterWrapper>
        <SettingsSection>
          <SettingsHeader text={t('pages.settings.header')} />
          {/* <SettingsItem>
            <BasicButton
              onPress={() => {
                console.log("");
              }}
              text={t('pages.settings.application')}
            />
          </SettingsItem> */}
          <SettingsItem>
            <BasicButton
              onPress={() => {
                navigation.navigate("settingsNotifications")
              }}
              text={t('pages.settings.notificationsHeader')}
            />
          </SettingsItem>
        </SettingsSection>
        <SettingsSection>
          <SettingsHeader text={t('pages.settings.account')} />
          <SettingsItem>
            <BasicButton
              onPress={() => {
                navigation.navigate("settingsAccount")
              }}
              text={t('pages.settings.myAccount')}
            />
          </SettingsItem>
          <SettingsItem>
            <BasicButton
              onPress={() => {
                setShowModal(true);
              }}
              text={t('pages.settings.logout')}
              warning={true}
            />
          </SettingsItem>
        </SettingsSection>
      </ColumnCenterWrapper>
      <BasicModal showModal={showModal} toggleModal={setShowModal}>
        <ModalItem>
          <ModalHeader>{t('pages.settings.logoutConfirmation')}</ModalHeader>
        </ModalItem>
        <ModalItem>
          <BasicButton onPress={handleLogOut} text={t('pages.settings.logout')} warning={true} />
        </ModalItem>
        <ModalItem>
          <BasicButton
            onPress={() => {
              setShowModal(false);
            }}
            text={t('common.cancel')}
          />
        </ModalItem>
      </BasicModal>
    </ScreenContainer>
  );
};

export default Settings;
