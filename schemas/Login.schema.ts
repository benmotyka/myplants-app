import * as Yup from "yup";
import i18n from "../i18n";

const { t } = i18n;

const MIN_USERNAME_CHARACTERS = 4;
const MAX_USERNAME_CHARACTERS = 20;
const MIN_PASSWORD_CHARACTERS = 6;

export const LoginSchema = Yup.object().shape({
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
});
