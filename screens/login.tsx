import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../App";
import { ScreenContainer } from "../styles/shared";

type AddPlantProps = NativeStackScreenProps<RootStackParamList, "login">;

const Login = ({ navigation }: LoginProps): JSX.Element => {
  return (
    <ScreenContainer>
      login
    </ScreenContainer>
  );
};

export default Login;
