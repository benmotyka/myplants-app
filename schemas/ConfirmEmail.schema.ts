import * as Yup from "yup";
import i18n from "../i18n";

const { t } = i18n;

export const ConfirmEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email(t("errors.invalidEmail"))
    .required(t("errors.required")),
});
