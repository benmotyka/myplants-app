import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import Back from "components/Back/Back";
import {
  ColumnCenterWrapper,
  Description,
  InputsWrapper,
  LoaderWrapper,
  MarginTopView,
  ScreenContainer,
  SmallHeader,
  SmallHeaderWrapper,
} from "styles/shared";

import i18n from "../../../i18n";
import { Formik, FormikHelpers } from "formik";
import Loader from "components/Loader/Loader";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import BasicButton from "components/BasicButton/BasicButton";
import { ConfirmEmailSchema } from "schemas/ConfirmEmail.schema";
import { ConfirmCodeSchema } from "schemas/ConfirmCode";
import showToast from "util/showToast";

type SettingsAccountConfirmEmailProps = NativeStackScreenProps<
  RootStackParamList,
  "settingsAccountConfirmEmail"
>;

const { t } = i18n;

const SettingsAccountConfirmEmail = ({
  navigation,
}: SettingsAccountConfirmEmailProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [emailEntered, setEmailEntered] = React.useState("");

  const onSubmitEmail = async (values: { email: string }) => {
    try {
      setLoading(true);
      //await plantsApi.post()
      setEmailEntered(values.email);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onSubmitCode = async (
    values: { code: string },
    {
      resetForm,
    }: {
      resetForm: FormikHelpers<{ code: string }>["resetForm"];
    }
  ) => {
    try {
      setLoading(true);
      // dispatch set verified email
      resetForm()
      showToast(t("components.emailConfirmation.success"), "success");
      navigation.navigate("settings");
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        {loading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          <>
            {emailEntered ? (
              <Formik
                initialValues={{
                  code: "",
                }}
                onSubmit={onSubmitCode}
                validationSchema={ConfirmCodeSchema}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <>
                    <SmallHeaderWrapper>
                      <SmallHeader>
                        {t("components.emailConfirmation.confirmCodeHeader")}
                      </SmallHeader>
                      <Description style={{ marginTop: 10 }}>
                        {t(
                          "components.emailConfirmation.confirmCodeDescription",
                          { email: emailEntered }
                        )}
                      </Description>
                    </SmallHeaderWrapper>
                    <InputsWrapper>
                      <BasicTextInput
                        label={t(
                          "components.emailConfirmation.confirmationCodeLabel"
                        )}
                        onChangeText={handleChange("code")}
                        onBlur={handleBlur("code")}
                        value={values.code}
                        error={errors.code}
                      />
                      <MarginTopView>
                        <BasicButton
                          onPress={handleSubmit as (values: any) => void}
                          text={t("common.confirm")}
                        />
                      </MarginTopView>
                    </InputsWrapper>
                  </>
                )}
              </Formik>
            ) : (
              <Formik
                initialValues={{
                  email: "",
                }}
                onSubmit={onSubmitEmail}
                validationSchema={ConfirmEmailSchema}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <>
                    <SmallHeaderWrapper>
                      <SmallHeader>
                        {t("components.emailConfirmation.header")}
                      </SmallHeader>
                      <Description style={{ marginTop: 10 }}>
                        {t("components.emailConfirmation.description")}
                      </Description>
                    </SmallHeaderWrapper>
                    <InputsWrapper>
                      <BasicTextInput
                        label={t("components.emailConfirmation.inputLabel")}
                        placeholder={t(
                          "components.emailConfirmation.inputPlaceholder"
                        )}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        error={errors.email}
                      />
                      <MarginTopView>
                        <BasicButton
                          onPress={handleSubmit as (values: any) => void}
                          text={t("common.submit")}
                        />
                      </MarginTopView>
                    </InputsWrapper>
                  </>
                )}
              </Formik>
            )}
          </>
        )}
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default SettingsAccountConfirmEmail;
