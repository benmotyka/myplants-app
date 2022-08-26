import * as Yup from "yup";
import i18n from "../i18n";
import { MIN_PASSWORD_CHARACTERS } from "./Login.schema";

const { t } = i18n;

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(
      MIN_PASSWORD_CHARACTERS,
      t("errors.fieldTooShort", {
        field: t("common.password"),
        number: MIN_PASSWORD_CHARACTERS,
      })
    )
    .required(t("errors.required")),
  newPassword: Yup.string()
    .min(
      MIN_PASSWORD_CHARACTERS,
      t("errors.fieldTooShort", {
        field: t("common.newPassword"),
        number: MIN_PASSWORD_CHARACTERS,
      })
    )
    .required(t("errors.required")),
  newPasswordRepeat: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], t("errors.passwordsMustMatch"))
    .required(t("errors.passwordsMustMatch")),
});
