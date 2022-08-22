import { Formik } from "formik";
import React from "react";

import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import i18n from "../../i18n";

import { Container } from "./EmailConfirmation.styles";
import {
  Description,
  InputsWrapper,
  LoaderWrapper,
  MarginTopView,
  SmallHeader,
  SmallHeaderWrapper,
} from "styles/shared";
import Loader from "components/Loader/Loader";
import BasicButton from "components/BasicButton/BasicButton";

const { t } = i18n;

const EmailConfirmation = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);

  return (
    <Container>
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
                <Description>
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
    </Container>
  );
};

export default EmailConfirmation;
