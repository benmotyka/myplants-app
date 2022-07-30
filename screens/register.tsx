import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

import { RootStackParamList } from "../App";
import plantsApi from "config/api/plants";
import Back from "components/Back/Back";
import BasicButton from "components/BasicButton/BasicButton";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import Loader from "components/Loader/Loader";
import { ApiErrors } from "enums/api-errors";
import { LoginResponse } from "interfaces/LoginResponse";
import { RegisterSchema } from "schemas/Register.schema";
import { userAction } from "store/actions";
import {
  ColumnCenterWrapper,
  Header,
  InputsWrapper,
  KeyboardScreen,
  LoaderWrapper,
  MarginTopView,
} from "styles/shared";
import showToast from "util/showToast";

type RegisterProps = NativeStackScreenProps<RootStackParamList, "register">;

interface RegisterForm {
  username: string;
  password: string;
}

interface RegisterResponse {
  status: string;
}

const Register = ({ navigation }: RegisterProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

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
      setLoading(true);
      await plantsApi.post<RegisterResponse>("/auth/register", {
        username: values.username,
        password: values.password,
      });
      const result = await plantsApi.post<LoginResponse>("/auth/login", {
        username: values.username,
        password: values.password,
      });
      dispatch(
        userAction.setUserDetails({
          username: values.username,
          jwt: result.data.access_token,
        })
      );
      resetForm();
      navigation.navigate("home");
    } catch (error) {
      console.log(error);
      switch (error) {
        case ApiErrors.usernameExists: 
          return showToast("Username exists", "error")
        default: 
          return showToast("Something went wrong. Please try again later.", "error")
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardScreen
      contentContainerStyle={{ paddingBottom: 50 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      bounces={false}
    >
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <Header>Register</Header>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={RegisterSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) =>
            loading ? (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            ) : (
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
            )
          }
        </Formik>
      </ColumnCenterWrapper>
    </KeyboardScreen>
  );
};

export default Register;
