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
import { useDispatch } from "react-redux";
import { userAction } from "store/actions";
import BasicModal from "components/BasicModal/BasicModal";
import { ModalHeader, ModalItem } from "components/BasicModal/BasicModal.styles";
import { UserDetails } from "interfaces/UserDetails";
import { useSelector } from "react-redux";
import { State } from "store/reducers";

type SettingsAccountProps = NativeStackScreenProps<
  RootStackParamList,
  "settingsAccount"
>;

const { t } = i18n;

const SettingsAccount = ({ navigation }: SettingsAccountProps): JSX.Element => {
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();

  const { userDetails }: { userDetails: UserDetails } = useSelector(
    (state: State) => state.user
  );
  
  const handleLogOut = () => {
    dispatch(userAction.removeUserDetails());
    navigation.navigate("login");
  };

  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <SettingsSection>
        <SettingsHeader text={t("pages.settings.myAccount")} />
          {!userDetails?.confirmedEmail ? <SettingsItem>
            <BasicButton
              onPress={() => {
                navigation.navigate("settingsAccountConfirmEmail");
              }}
              text={t("pages.settings.account.confirmEmail.label")}
              important
            />
          </SettingsItem> : null}
          <SettingsItem>
            <BasicButton
              onPress={() => {
                navigation.navigate("settingsAccountChangePassword");
              }}
              text={t("pages.settings.account.changePassword.label")}
            />
          </SettingsItem>
          <SettingsItem>
            <BasicButton
              onPress={() => {
                setShowModal(true);
              }}
              text={t("pages.settings.logout")}
              warning={true}
            />
          </SettingsItem>
        </SettingsSection>
      </ColumnCenterWrapper>
      <BasicModal showModal={showModal} toggleModal={setShowModal}>
        <ModalItem>
          <ModalHeader>{t("pages.settings.logoutConfirmation")}</ModalHeader>
        </ModalItem>
        <ModalItem>
          <BasicButton
            onPress={handleLogOut}
            text={t("pages.settings.logout")}
            warning={true}
          />
        </ModalItem>
        <ModalItem>
          <BasicButton
            onPress={() => {
              setShowModal(false);
            }}
            text={t("common.cancel")}
          />
        </ModalItem>
      </BasicModal>
    </ScreenContainer>
  );
};

export default SettingsAccount;
