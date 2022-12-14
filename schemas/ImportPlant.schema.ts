import * as Yup from "yup";
import i18n from "config/i18n";

const { t } = i18n;

export const ImportPlantSchema = Yup.object().shape({
    plantShareId: Yup.string().required(t("errors.required")),
});
