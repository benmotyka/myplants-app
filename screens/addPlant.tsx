import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import { ScreenContainer, ColumnCenterWrapper } from "../styles/shared";
import { Formik } from "formik";
import { Button, TextInput, View } from "react-native";
import BasicTextInput from "../components/BasicTextInput/BasicTextInput";
import BasicImageInput from "../components/BasicImageInput/BasicImageInput";

type AddPlantProps = NativeStackScreenProps<RootStackParamList, "addPlant">;

const AddPlant = ({ navigation }: AddPlantProps): JSX.Element => {
  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View
            >
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <BasicImageInput/>
              <BasicTextInput
              placeholder='Enter flower name'
              />
              <Button
                onPress={handleSubmit as (values: any) => void}
                title="Submit"
              />
            </View>
          )}
        </Formik>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default AddPlant;
