import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { RootStackParamList } from "../App";
import BasicButton from "../components/BasicButton/BasicButton";
import BasicTextInput from "../components/BasicTextInput/BasicTextInput";
import { FooterText, FooterWrapper } from "../styles/screens/login.styles";
import { LoginSchema } from "../schemas/Login.schema";

import {
  ColumnCenterWrapper,
  Header,
  InputsWrapper,
  LoaderWrapper,
  MarginTopView,
  ScreenContainer,
} from "../styles/shared";
import plantsApi from "../config/api/plants";
import Loader from "../components/Loader/Loader";
import fakeLoader from "../util/fakeLoader";
import { setItem, getItem } from "../store/storage";
import { useIsFocused } from "@react-navigation/native";

type LoginProps = NativeStackScreenProps<RootStackParamList, "login">;

interface LoginForm {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

const Login = ({ navigation }: LoginProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return
    (async() => {
      const jwt = await getItem('jwt');
      if (jwt) return navigation.navigate("home");
    })()
  }, [isFocused])

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
      await fakeLoader();
      const result = await plantsApi.post<LoginResponse>("/auth/login", {
        username: values.username,
        password: values.password,
      });
      await setItem('jwt', result.data.access_token)
      resetForm();
      navigation.navigate("home");
    } catch (error) {
      console.error(error)
      setFieldError("username", "Invalid username or password");
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
