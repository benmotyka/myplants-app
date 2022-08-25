import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import Back from "components/Back/Back";
import BasicButton from "components/BasicButton/BasicButton";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import Loader from "components/Loader/Loader";
import { Formik } from "formik";
import React from "react";
import {
  ColumnCenterWrapper,
  InputsWrapper,
  LoaderWrapper,
  ScreenContainer,
  SmallHeader,
  SmallHeaderWrapper,
} from "styles/shared";
import i18n from "../../../i18n";

type SettingsAccountProps = NativeStackScreenProps<
  RootStackParamList,
  "settingsAccountChangePassword"
>;

const { t } = i18n;

const SettingsAccountChangePassword = ({
  navigation,
}: SettingsAccountProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);

  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            newPasswordRepeat: "",
          }}
          onSubmit={(values) => console.log(values)}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) =>
            loading ? (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            ) : (
              <>
                <SmallHeaderWrapper>
                  <SmallHeader>
                    {t("pages.settings.account.changePassword")}
                  </SmallHeader>
                </SmallHeaderWrapper>
                <InputsWrapper>
                  <BasicTextInput
                    label={t("pages.settings.account.oldPasswordLabel")}
                    placeholder={t(
                      "pages.settings.account.oldPasswordPlaceholder"
                    )}
                    onChangeText={handleChange("oldPassword")}
                    onBlur={handleBlur("oldPassword")}
                    value={values.oldPassword}
                    hideInput={true}
                    error={errors.oldPassword}
                  />
                  <BasicTextInput
                    label={t("pages.settings.account.newPasswordLabel")}
                    placeholder={t(
                      "pages.settings.account.newPasswordPlaceholder"
                    )}
                    onChangeText={handleChange("newPassword")}
                    onBlur={handleBlur("newPassword")}
                    value={values.newPassword}
                    hideInput={true}
                    error={errors.newPassword}
                  />
                  <BasicTextInput
                    label={t("pages.settings.account.newPasswordRepeatLabel")}
                    placeholder={t(
                      "pages.settings.account.newPasswordRepeatPlaceholder"
                    )}
                    onChangeText={handleChange("newPasswordRepeat")}
                    onBlur={handleBlur("newPasswordRepeat")}
                    value={values.newPasswordRepeat}
                    hideInput={true}
                    error={errors.newPasswordRepeat}
                  />
                  <BasicButton
                    onPress={handleSubmit as (values: any) => void}
                    text={t("common.submit")}
                  />
                </InputsWrapper>
              </>
            )
          }
        </Formik>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default SettingsAccountChangePassword;
