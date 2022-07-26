import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import { useSelector } from "react-redux";

import { RootStackParamList } from "../../App";
import plantsApi from "config/api/plants";
import Back from "components/Back/Back";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import BasicImageInput from "components/BasicImageInput/BasicImageInput";
import BasicButton from "components/BasicButton/BasicButton";
import Loader from "components/Loader/Loader";
import { UserDetails } from "interfaces/UserDetails";
import { AddPlantSchema } from "schemas/AddPlant.schema";
import {
  KeyboardScreen,
  ColumnCenterWrapper,
  InputsWrapper,
  MarginTopView,
  LoaderWrapper,
} from "styles/shared";
import { State } from "store/reducers";
import showToast from "util/showToast";
import { ApiErrors } from "enums/api-errors";

type AddPlantProps = NativeStackScreenProps<RootStackParamList, "addPlant">;

interface AddPlantForm {
  name: string;
  description?: string;
  image?: string;
}

const AddPlant = ({ navigation }: AddPlantProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);

  const { userDetails }: { userDetails: UserDetails } = useSelector(
    (state: State) => state.user
  );

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
      await plantsApi.post(
        "/plants",
        {
          name: values.name.trim(),
          description: values.description?.trim(),
          imageSrc: values.image,
        },
        {
          headers: {
            Authorization: `Bearer ${userDetails.jwt}`,
          },
        }
      );
      resetForm();
      navigation.navigate("home");
      showToast("Plant added", "success");
    } catch (error) {
      switch (error) {
        case ApiErrors.errorUploadingFile:
          return showToast(
            "Invalid file type", "error"
          );
        default:
          return showToast(
            "Something went wrong. Please try again later",
            "error"
          );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardScreen
      contentContainerStyle={{ paddingBottom: 50 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      bounces={false}
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
                  value={values.name}
                  label="Name"
                  placeholder="Enter your plant name..."
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  error={errors.name}
                />
                <BasicTextInput
                  value={values.description}
                  label="Description"
                  placeholder="Enter your plant description..."
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
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
