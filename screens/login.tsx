import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootStackParamList } from "../App";
import plantsApi from "config/api/plants";
import Loader from "components/Loader/Loader";
import BasicButton from "components/BasicButton/BasicButton";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import { ApiErrors } from "enums/api-errors";
import { IUserDetails } from "interfaces/IUserDetails";
import { LoginResponse } from "interfaces/ILoginResponse";
import { LoginSchema } from "schemas/Login.schema";
import { userAction } from "store/actions";
import { State } from "store/reducers";
import { FooterText, FooterWrapper } from "styles/screens/login.styles";
import {
  ColumnCenterWrapper,
  Header,
  InputsWrapper,
  LoaderWrapper,
  MarginTopView,
  ScreenContainer,
} from "styles/shared";
import showToast from "util/showToast";

type LoginProps = NativeStackScreenProps<RootStackParamList, "login">;

interface LoginForm {
  username: string;
  password: string;
}

const Login = ({ navigation }: LoginProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const { userDetails }: { userDetails: IUserDetails } = useSelector(
    (state: State) => state.user
  );

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (!isFocused) return;
      if (userDetails?.jwt) navigation.navigate("home");
    } catch (error) {
      console.log(error);
    }
  }, [isFocused]);

  const onSubmit = async (
    values: LoginForm,
    {
      resetForm,
      setFieldError,
    }: {
      resetForm: FormikHelpers<LoginForm>["resetForm"];
      setFieldError: FormikHelpers<LoginForm>["setFieldError"];
    }
  ) => {
    try {
      setLoading(true);
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
      console.log(error) 
      switch (error) {
        case ApiErrors.invalidCredentials:
          return showToast("Invalid username or password", "error")
        default:
          return showToast("Invalid username or password", "error")
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Header>Login</Header>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={LoginSchema}
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
      <FooterWrapper>
        <FooterText onPress={() => navigation.navigate("register")}>
          Register now
        </FooterText>
      </FooterWrapper>
    </ScreenContainer>
  );
};

export default Login;
