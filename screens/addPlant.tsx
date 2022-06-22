import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import { ScreenContainer, ColumnCenterWrapper, InputsWrapper, MarginTopView } from "../styles/shared";
import { Formik } from "formik";
import BasicTextInput from "../components/BasicTextInput/BasicTextInput";
import BasicImageInput from "../components/BasicImageInput/BasicImageInput";
import BasicButton from "../components/BasicButton/BasicButton";

type AddPlantProps = NativeStackScreenProps<RootStackParamList, "addPlant">;

const AddPlant = ({ navigation }: AddPlantProps): JSX.Element => {

  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <Formik
          initialValues={{ name: "", description: "", image: "" }}
          onSubmit={(values, {resetForm}) => {
            console.log(values)
            navigation.navigate("home");
            resetForm()
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <InputsWrapper>
              <BasicImageInput image={values.image} setImage={handleChange("image")} />
              <BasicTextInput
                label="Name"
                placeholder="Enter your plant name..."
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              <BasicTextInput
                label="Description"
                placeholder="Enter your plant description..."
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                textarea={true}
              />
              <MarginTopView>
              <BasicButton
                onPress={handleSubmit as (values: any) => void}
                text="Add plant"
              />
              </MarginTopView>
            </InputsWrapper>
          )}
        </Formik>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default AddPlant;
