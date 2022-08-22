import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootStackParamList } from "../../App";
import plantsApi from "config/api/plants";
import Loader from "components/Loader/Loader";
import BasicButton from "components/BasicButton/BasicButton";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import { ApiErrors } from "enums/api-errors";
import { UserDetails } from "interfaces/UserDetails";
import { LoginResponse } from "interfaces/LoginResponse";
import { userAction } from "store/actions";
import { State } from "store/reducers";
import {
  ColumnCenterWrapper,
  Header,
  InputsWrapper,
  LoaderWrapper,
  MarginTopView,
  ScreenContainer,
  SmallHeader,
  SmallHeaderWrapper,
} from "styles/shared";
import showToast from "util/showToast";
import Back from "components/Back/Back";
import { View } from "react-native";
import i18n from "../../i18n";
import EmailConfirmation from "components/EmailConfirmation/EmailConfirmation";

type SettingsAccountProps = NativeStackScreenProps<
  RootStackParamList,
  "settingsAccount"
>;

const { t } = i18n;

const SettingsAccount = ({ navigation }: SettingsAccountProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const { userDetails }: { userDetails: UserDetails } = useSelector(
    (state: State) => state.user
  );

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

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
                <EmailConfirmation />
                <MarginTopView>
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
                </MarginTopView>
              </>
            )
          }
        </Formik>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default SettingsAccount;
