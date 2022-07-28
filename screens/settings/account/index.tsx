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
import { State } from "store/reducers";
import {
  ColumnCenterWrapper,
  Header,
  InputsWrapper,
  LoaderWrapper,
  MarginTopView,
  ScreenContainer,
} from "styles/shared";
import showToast from "util/showToast";

type SettingsAccountProps = NativeStackScreenProps<RootStackParamList, "settingsAccount">;

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
        <Header>My account</Header>
        <Formik
          initialValues={{ oldPassword: "", newPassword: "", newPasswordRepeat: "" }}
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
              <InputsWrapper>
                <BasicTextInput
                  label="Old password"
                  placeholder="Enter your password..."
                  onChangeText={handleChange("oldPassword")}
                  onBlur={handleBlur("oldPassword")}
                  value={values.oldPassword}
                  hideInput={true}
                  error={errors.oldPassword}
                />
                <BasicTextInput
                  label="New password"
                  placeholder="Enter your new password..."
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  value={values.newPassword}
                  hideInput={true}
                  error={errors.newPassword}
                />
                <BasicTextInput
                  label="Repeat new password"
                  placeholder="Enter your new password..."
                  onChangeText={handleChange("newPasswordRepeat")}
                  onBlur={handleBlur("newPasswordRepeat")}
                  value={values.newPasswordRepeat}
                  hideInput={true}
                  error={errors.newPasswordRepeat}
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

    </ScreenContainer>
  );
};

export default SettingsAccount;
