import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import { ScreenContainer, ColumnCenterWrapper } from "../styles/shared";
import { Formik } from "formik";
import { View } from "react-native";
import BasicTextInput from "../components/BasicTextInput/BasicTextInput";
import BasicImageInput from "../components/BasicImageInput/BasicImageInput";
import BasicButton from "../components/BasicButton/BasicButton";

type AddPlantProps = NativeStackScreenProps<RootStackParamList, "addPlant">;

const AddPlant = ({ navigation }: AddPlantProps): JSX.Element => {
  const [image, setImage] = React.useState("");

  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <Formik
          initialValues={{ name: "", description: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={{display: "flex", alignItems: "center"}}>
              <BasicImageInput image={image} setImage={setImage} />
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
              <View style={{marginTop: 50}}>
              <BasicButton
                onPress={handleSubmit as (values: any) => void}
                text="Submit"
              />
              </View>
            </View>
          )}
        </Formik>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default AddPlant;
