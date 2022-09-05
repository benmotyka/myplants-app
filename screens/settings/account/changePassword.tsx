import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import Back from "components/Back/Back";
import BasicButton from "components/BasicButton/BasicButton";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import Loader from "components/Loader/Loader";
import plantsApi from "config/api/plants";
import { ApiErrors } from "enums/api-errors";
import { Formik, FormikHelpers } from "formik";
import { UserDetails } from "interfaces/UserDetails";
import React from "react";
import { useSelector } from "react-redux";
import { ChangePasswordSchema } from "schemas/ChangePassword.schema";
import { State } from "store/reducers";
import {
  ColumnCenterWrapper,
  InputsWrapper,
  LoaderWrapper,
  MarginTopView,
  ScreenContainer,
  SmallHeader,
  SmallHeaderWrapper,
} from "styles/shared";
import showToast from "util/showToast";
import i18n from "../../../i18n";

type SettingsAccountChangePasswordProps = NativeStackScreenProps<
  RootStackParamList,
  "settingsAccountChangePassword"
>;

const { t } = i18n;

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

const SettingsAccountChangePassword = ({
  navigation,
}: SettingsAccountChangePasswordProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);

  const { userDetails }: { userDetails: UserDetails } = useSelector(
    (state: State) => state.user
  );

  const onSubmit = async (
    values: ChangePasswordForm,
    { resetForm }: { resetForm: FormikHelpers<ChangePasswordForm>["resetForm"] }
  ) => {
    try {
      setLoading(true);
      await plantsApi.patch(
        "/auth/password",
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userDetails.jwt}`,
          },
        }
      );
      showToast(t("pages.settings.account.changePassword.success"), "success");
      resetForm();
      navigation.navigate("settings");
    } catch (error) {
      console.log(error);
      switch (error) {
        case ApiErrors.INVALID_CREDENTIALS:
          return showToast(t("errors.invalidOldPassword"), "error");
        default:
          return showToast(t("errors.general"), "error");
      }
    } finally {
      setLoading(false);
    }
  };

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
          onSubmit={onSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={ChangePasswordSchema}
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
                    {t("pages.settings.account.changePassword.label")}
                  </SmallHeader>
                </SmallHeaderWrapper>
                <InputsWrapper>
                  <BasicTextInput
                    label={t(
                      "pages.settings.account.changePassword.oldPasswordLabel"
                    )}
                    placeholder={t(
                      "pages.settings.account.changePassword.oldPasswordPlaceholder"
                    )}
                    onChangeText={handleChange("oldPassword")}
                    onBlur={handleBlur("oldPassword")}
                    value={values.oldPassword}
                    hideInput={true}
                    error={errors.oldPassword}
                  />
                  <BasicTextInput
                    label={t(
                      "pages.settings.account.changePassword.newPasswordLabel"
                    )}
                    placeholder={t(
                      "pages.settings.account.changePassword.newPasswordPlaceholder"
                    )}
                    onChangeText={handleChange("newPassword")}
                    onBlur={handleBlur("newPassword")}
                    value={values.newPassword}
                    hideInput={true}
                    error={errors.newPassword}
                  />
                  <BasicTextInput
                    label={t(
                      "pages.settings.account.changePassword.newPasswordRepeatLabel"
                    )}
                    placeholder={t(
                      "pages.settings.account.changePassword.newPasswordRepeatPlaceholder"
                    )}
                    onChangeText={handleChange("newPasswordRepeat")}
                    onBlur={handleBlur("newPasswordRepeat")}
                    value={values.newPasswordRepeat}
                    hideInput={true}
                    error={errors.newPasswordRepeat}
                  />
                  <MarginTopView>
                    <BasicButton
                      onPress={handleSubmit as (values: any) => void}
                      text={t("common.submit")}
                    />
                  </MarginTopView>
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
