import * as Yup from "yup";
import { MAX_USERNAME_CHARACTERS, MIN_PASSWORD_CHARACTERS, MIN_USERNAME_CHARACTERS } from "./Login.schema";
import i18n from "../i18n";

const { t } = i18n;

export const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(
        MIN_USERNAME_CHARACTERS,
        t("errors.fieldTooShort", {
          field: t("common.username"),
          number: MIN_USERNAME_CHARACTERS,
        })
      )
      .max(
        MAX_USERNAME_CHARACTERS,
        t("errors.fieldTooLong", {
          field: t("common.password"),
          number: MAX_USERNAME_CHARACTERS,
        })
      )
      .required(t("errors.required")),
    password: Yup.string()
      .min(
        MIN_PASSWORD_CHARACTERS,
        t("errors.fieldTooShort", {
          field: t("common.password"),
          number: MIN_PASSWORD_CHARACTERS,
        })
      )
      .required(t("errors.required")),
      passwordRepeat:  Yup.string().oneOf([
        Yup.ref("password"), null], t("errors.passwordsMustMatch")).required(t("errors.passwordsMustMatch")),
  });

