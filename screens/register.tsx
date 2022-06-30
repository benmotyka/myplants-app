import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React from "react";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import BasicButton from "../components/BasicButton/BasicButton";
import BasicTextInput from "../components/BasicTextInput/BasicTextInput";
import {
  ColumnCenterWrapper,
  Header,
  InputsWrapper,
  MarginTopView,
  ScreenContainer,
} from "../styles/shared";

type RegisterProps = NativeStackScreenProps<RootStackParamList, "register">;

interface RegisterForm {
  name: string;
  password: string;
}

const Register = ({ navigation }: RegisterProps): JSX.Element => {
  const onSubmit = (
    values: RegisterForm,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(values);
    navigation.navigate("home");
    resetForm()
  };
  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <Header>Register</Header>
        <Formik initialValues={{ name: "", password: "" }} onSubmit={onSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <InputsWrapper>
              <BasicTextInput
                label="Username"
                placeholder="Enter your username..."
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              <BasicTextInput
                label="Password"
                placeholder="Enter your password..."
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                hideInput={true}
              />
              <MarginTopView>
                <BasicButton
                  onPress={handleSubmit as (values: any) => void}
                  text="Submit"
                />
              </MarginTopView>
            </InputsWrapper>
          )}
        </Formik>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default Register;
