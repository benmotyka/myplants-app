import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
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
          <SettingsItem text="Application" link="account" />
          <SettingsItem text="Notifications" link="account" />
        </View>
        <View style={{ width: "85%", marginBottom: 50 }}>
          <SettingsHeader text="Account" />
          <SettingsItem text="My account" link="account" />
          <SettingsItem text="Log out" link="account" />
        </View>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default Settings;
