import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import BasicButton from "../components/BasicButton/BasicButton";
import SettingsHeader from "../components/Settings/SettingsHeader";
import SettingsItem from "../components/Settings/SettingsItem";
import { ColumnCenterWrapper, ScreenContainer } from "../styles/shared";

type SettingsProps = NativeStackScreenProps<RootStackParamList, "settings">;

const Settings = ({ navigation }: SettingsProps): JSX.Element => {
  return (
    <ScreenContainer>
      <Back navigation={navigation} />
      <ColumnCenterWrapper>
        <View style={{ width: "85%", marginBottom: 50 }}>
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
        </View>
        <View style={{ width: "85%", marginBottom: 50 }}>
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
              console.log("");
            }}
            text="Log out"
            warning={true}
          />
          </SettingsItem>
        </View>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default Settings;
