import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import {
  KeyboardScreen,
  ColumnCenterWrapper,
  InputsWrapper,
  MarginTopView,
  LoaderWrapper,
} from "../styles/shared";
import { Formik, FormikHelpers } from "formik";
import BasicTextInput from "../components/BasicTextInput/BasicTextInput";
import BasicImageInput from "../components/BasicImageInput/BasicImageInput";
import BasicButton from "../components/BasicButton/BasicButton";
import { getItem } from "../store/storage";
import Loader from "../components/Loader/Loader";
import plantsApi from "../config/api/plants";
import { AddPlantSchema } from "../schemas/AddPlant.schema";

type AddPlantProps = NativeStackScreenProps<RootStackParamList, "addPlant">;

interface AddPlantForm {
  name: string;
  description?: string;
  image?: string;
}

const AddPlant = ({ navigation }: AddPlantProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (
    values: AddPlantForm,
    {
      resetForm,
      setFieldError,
    }: {
      resetForm: FormikHelpers<AddPlantForm>["resetForm"];
      setFieldError: FormikHelpers<AddPlantForm>["setFieldError"];
    }
  ) => {
    try {
      setLoading(true);
      const jwt = await getItem("jwt");
      const result = await plantsApi.post("/plants", {
        name: values.name.trim(),
        description: values.description?.trim(),
        imageSrc: values.image
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      resetForm();
      navigation.navigate("home");
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardScreen
    contentContainerStyle={{paddingBottom: 50}}
    resetScrollToCoords={{ x: 0, y: 0 }}
    scrollEnabled={true}
    >
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <Formik
          initialValues={{ name: "", description: "", image: "" }}
          validationSchema={AddPlantSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) =>
            loading ? (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            ) : (
              <InputsWrapper>
                <BasicImageInput
                  image={values.image}
                  setImage={handleChange("image")}
                />
                <BasicTextInput
                  label="Name"
                  placeholder="Enter your plant name..."
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  error={errors.name}
                />
                <BasicTextInput
                  label="Description"
                  placeholder="Enter your plant description..."
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  textarea={true}
                  error={errors.description}
                />
                <MarginTopView>
                  <BasicButton
                    onPress={handleSubmit as (values: any) => void}
                    text="Add plant"
                  />
                </MarginTopView>
              </InputsWrapper>
            )
          }
        </Formik>
      </ColumnCenterWrapper>
    </KeyboardScreen>
  );
};

export default AddPlant;
