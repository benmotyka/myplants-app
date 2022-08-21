import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootStackParamList } from "../App";
import i18n from "../i18n";
import plantsApi from "config/api/plants";
import Loader from "components/Loader/Loader";
import BasicButton from "components/BasicButton/BasicButton";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import { ApiErrors } from "enums/api-errors";
import { UserDetails } from "interfaces/UserDetails";
import { LoginResponse } from "interfaces/LoginResponse";
import { LoginSchema } from "schemas/Login.schema";
import { userAction } from "store/actions";
import { State } from "store/reducers";
import { FooterText, FooterWrapper } from "styles/screens/login.styles";
import {
  ColumnCenterWrapper,
  Header,
  InputsWrapper,
  KeyboardScreen,
  LoaderWrapper,
  MarginTopView,
} from "styles/shared";
import showToast from "util/showToast";

type LoginProps = NativeStackScreenProps<RootStackParamList, "login">;

interface LoginForm {
  username: string;
  password: string;
}

const { t } = i18n;

const Login = ({ navigation }: LoginProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const { userDetails }: { userDetails: UserDetails } = useSelector(
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
          jwt: result.data.accessToken,
        })
      );
      dispatch(userAction.setUserSettings(result.data.userSettings));
      resetForm();
      navigation.navigate("home");
    } catch (error) {
      console.log(error);
      switch (error) {
        case ApiErrors.invalidCredentials:
          return showToast(t("errors.invalidUsernameOrPassword"), "error");
        default:
          return showToast(t("errors.invalidUsernameOrPassword"), "error");
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
        <Header>{t("common.login")}</Header>
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
                  label={t("common.username")}
                  placeholder={t("pages.login.usernamePlaceholder")}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  error={errors.username}
                />
                <BasicTextInput
                  label={t("common.password")}
                  placeholder={t("pages.login.passwordPlaceholder")}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  hideInput={true}
                  error={errors.password}
                />
                <MarginTopView>
                  <BasicButton
                    onPress={handleSubmit as (values: any) => void}
                    text={t("common.submit")}
                  />
                </MarginTopView>
              </InputsWrapper>
            )
          }
        </Formik>
      </ColumnCenterWrapper>
      <FooterWrapper>
        <FooterText onPress={() => navigation.navigate("register")}>
          {t("pages.login.registerNow")}
        </FooterText>
      </FooterWrapper>
    </KeyboardScreen>
  );
};

export default Login;
