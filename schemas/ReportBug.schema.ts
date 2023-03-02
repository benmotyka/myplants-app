import * as Yup from "yup";
import i18n from "config/i18n";

const { t } = i18n;

export const ReportBugSchema = Yup.object().shape({
    description: Yup.string(),
    email: Yup.string().email(t("errors.emailOptional")).optional(),
});
