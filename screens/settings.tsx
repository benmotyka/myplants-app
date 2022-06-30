import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import BasicButton from "../components/BasicButton/BasicButton";
import BasicModal from "../components/BasicModal/BasicModal";
import { ModalHeader, ModalItem } from "../components/BasicModal/BasicModal.styles";
import { SettingsSection } from "../components/Settings/Settings.styles";
import SettingsHeader from "../components/Settings/SettingsHeader";
import SettingsItem from "../components/Settings/SettingsItem";
import { ColumnCenterWrapper, ScreenContainer } from "../styles/shared";

type SettingsProps = NativeStackScreenProps<RootStackParamList, "settings">;

const Settings = ({ navigation }: SettingsProps): JSX.Element => {
  const [showModal, setShowModal] = React.useState(false);

  const handleLogOut = () => {
    navigation.navigate("login");
  }

  return (
    <ScreenContainer>
      <Back navigation={navigation} />
      <ColumnCenterWrapper>
        <SettingsSection>
        <SettingsHeader text="Plants" />
        <SettingsItem>
          <BasicButton
            onPress={() => {
              console.log("");
            }}
            text="Share your plants"
            important={true}
          />
          </SettingsItem>
          <SettingsItem>
          <BasicButton
            onPress={() => {
              console.log("");
            }}
            text="Import plants"
          />
          </SettingsItem>
        </SettingsSection>
        <SettingsSection>
          <SettingsHeader text="Settings" />
          <SettingsItem>
          <BasicButton
            onPress={() => {
              console.log("");
            }}
            text="Application"
          />
          </SettingsItem>
          <SettingsItem>
          <BasicButton
            onPress={() => {
              console.log("");
            }}
            text="Notifications"
          />
          </SettingsItem>
        </SettingsSection>
        <SettingsSection>
          <SettingsHeader text="Account" />
          <SettingsItem>
          <BasicButton
            onPress={() => {
              console.log("");
            }}
            text="My account"
          />
          </SettingsItem>
          <SettingsItem>
          <BasicButton
            onPress={() => {
              setShowModal(true)
            }}
            text="Log out"
            warning={true}
          />
          </SettingsItem>
        </SettingsSection>
      </ColumnCenterWrapper>
      {showModal ? (
        <BasicModal toggleModal={setShowModal}>
            <ModalItem>
              <ModalHeader>Are you sure you want to log out?</ModalHeader>
            </ModalItem>
            <ModalItem>
              <BasicButton
                onPress={handleLogOut}
                text="Log out"
                warning={true}
              />
            </ModalItem>
            <ModalItem>
              <BasicButton onPress={() => {
                setShowModal(false)
              }} text="Cancel" />
            </ModalItem>
        </BasicModal>
      ) : null}
    </ScreenContainer>
  );
};

export default Settings;
