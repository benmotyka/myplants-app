import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import Back from "components/Back/Back";
import {
  ColumnCenterWrapper,
  Description,
  InputsWrapper,
  LoaderWrapper,
  ScreenContainer,
  SmallHeader,
  SmallHeaderWrapper,
} from "styles/shared";

import i18n from "../../../i18n";
import { Formik } from "formik";
import Loader from "components/Loader/Loader";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import BasicButton from "components/BasicButton/BasicButton";

type SettingsAccountConfirmEmailProps = NativeStackScreenProps<
  RootStackParamList,
  "settingsAccountConfirmEmail"
>;

const { t } = i18n;

const SettingsAccountConfirmEmail = ({
  navigation,
}: SettingsAccountConfirmEmailProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);

  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <Formik
          initialValues={{
            email: "",
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
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.email}
                    error={errors.email}
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

export default SettingsAccountConfirmEmail;
