import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import BasicButton from "../components/BasicButton/BasicButton";
import BasicTextInput from "../components/BasicTextInput/BasicTextInput";
import plantsApi from "../config/api/plants";
import { RegisterSchema } from "../schemas/Register.schema";
import {
  ColumnCenterWrapper,
  Header,
  InputsWrapper,
  MarginTopView,
  ScreenContainer,
} from "../styles/shared";

type RegisterProps = NativeStackScreenProps<RootStackParamList, "register">;

interface RegisterForm {
  username: string;
  password: string;
}

interface RegisterResponse {
  status: string;
}

const Register = ({ navigation }: RegisterProps): JSX.Element => {

  const onSubmit = async (
    values: RegisterForm,
    {
      resetForm,
      setFieldError,
    }: {
      resetForm: FormikHelpers<RegisterForm>["resetForm"];
      setFieldError: FormikHelpers<RegisterForm>["setFieldError"];
    }
  ) => {
    try {
      await plantsApi.post<RegisterResponse>("/auth/register", {
        username: values.username,
        password: values.password,
      });
      resetForm();
      navigation.navigate("home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <Header>Register</Header>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={RegisterSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <InputsWrapper>
              <BasicTextInput
                label="Username"
                placeholder="Enter your username..."
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                error={errors.username}
              />
              <BasicTextInput
                label="Password"
                placeholder="Enter your password..."
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                hideInput={true}
                error={errors.password}
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
