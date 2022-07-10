import * as Yup from "yup";

const PLANT_NAME_MAX = 15;
const DESCRIPTION_MAX = 100;

export const AddPlantSchema = Yup.object().shape({
  name: Yup.string()
    .max(
      PLANT_NAME_MAX,
      `Plant name too long. Maximum ${PLANT_NAME_MAX} characters.`
    )
    .required("Required"),
  description: Yup.string().max(
    DESCRIPTION_MAX,
    `Description too long. Maximum ${DESCRIPTION_MAX} characters.`
  ),
  image: Yup.string()
});
