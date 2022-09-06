import * as Yup from "yup";
import i18n from "../i18n";

const { t } = i18n;

export const ConfirmCodeSchema = Yup.object().shape({
  code: Yup.string()
    .min(5, t("errors.invalidCode"))
    .required(t("errors.required")),
});
