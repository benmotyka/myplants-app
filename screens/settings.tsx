import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import { ScreenContainer } from "../styles/shared";

type SettingsProps = NativeStackScreenProps<RootStackParamList, "settings">;

const Settings = ({ navigation }: SettingsProps): JSX.Element => {
  return (
    <ScreenContainer>
      Settings
      <Back navigation={navigation} />
    </ScreenContainer>
  );
};

export default Settings;
