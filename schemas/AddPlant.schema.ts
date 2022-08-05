import * as Yup from "yup";
import i18n from "../i18n";

const { t } = i18n;

const MAX_PLANT_CHARACTERS = 25;
const MAX_DESCRIPTION_CHARACTERS = 100;

const MIN_WATERING_FREQUENCY_VALUE = 1;
const MAX_WATERING_FREQUENCY_VALUE = 9;

export const createAddPlantSchema = (isWateringReminderOn: boolean) =>
  Yup.object().shape({
    name: Yup.string()
      .max(
        MAX_PLANT_CHARACTERS,
        t("errors.fieldTooLong", {
          field: t("common.plantName"),
          number: MAX_PLANT_CHARACTERS,
        })
      )
      .required(t("errors.required")),
    description: Yup.string().max(
      MAX_DESCRIPTION_CHARACTERS,
      t("errors.fieldTooLong", {
        field: t("common.description"),
        number: MAX_DESCRIPTION_CHARACTERS,
      })
    ),
    ...(isWateringReminderOn && {
      wateringFrequencyNumber: Yup.number()
        .typeError(t("errors.valueMustBeNumber"))
        .min(
          MIN_WATERING_FREQUENCY_VALUE,
          t("errors.minimumValueIs", { value: MIN_WATERING_FREQUENCY_VALUE })
        )
        .max(
          MAX_WATERING_FREQUENCY_VALUE,
          t("errors.maximumValueIs", { value: MAX_WATERING_FREQUENCY_VALUE })
        ),
    }),
  });
