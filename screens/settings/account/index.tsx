import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootStackParamList } from "../../../App";
import plantsApi from "config/api/plants";
import Loader from "components/Loader/Loader";
import BasicButton from "components/BasicButton/BasicButton";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import { ApiErrors } from "enums/api-errors";
import { UserDetails } from "interfaces/UserDetails";
import { LoginResponse } from "interfaces/LoginResponse";
import { userAction } from "store/actions";
import SettingsItem from "components/Settings/SettingsItem";
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
import i18n from "../../../i18n";
import EmailConfirmation from "components/EmailConfirmation/EmailConfirmation";
import { SettingsSection } from "components/Settings/Settings.styles";

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
                <SettingsSection>
                <SettingsItem>
                    <BasicButton
                      onPress={() => {
                        navigation.navigate("settingsAccountChangePassword");
                      }}
                      text={t("pages.settings.account.confirmEmail")}
                    />
                  </SettingsItem>
                  <SettingsItem>
                    <BasicButton
                      onPress={() => {
                        navigation.navigate("settingsAccountChangePassword");
                      }}
                      text={t("pages.settings.account.changePassword")}
                    />
                  </SettingsItem>
                </SettingsSection>
              </>
            )
          }
        </Formik>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default SettingsAccount;
