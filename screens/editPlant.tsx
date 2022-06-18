import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import {
  ScreenContainer,
  ColumnCenterWrapper,
  InputsWrapper,
  IconContainer
} from "../styles/shared";
import { Formik } from "formik";
import { ActivityIndicator, Text, View } from "react-native";
import BasicTextInput from "../components/BasicTextInput/BasicTextInput";
import BasicImageInput from "../components/BasicImageInput/BasicImageInput";
import BasicButton from "../components/BasicButton/BasicButton";
import { IPlant } from "../interfaces/IPlant";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

type EditPlantProps = NativeStackScreenProps<RootStackParamList, "editPlant">;

const EditPlant = ({ route, navigation }: EditPlantProps): JSX.Element => {
  const plantId = route.params.plantId
  const [fetchedPlant, setFetchedPlant] = React.useState<IPlant>();

  React.useEffect(() => {
    // const plant = getPlantById(plantId)
    setFetchedPlant({
      id: plantId,
      name: "kwiat",
      description: "opis mojego kwiatka",
    });
  }, []);

  const handleDelete = () => {
    console.log('delete', plantId)
  }

  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <IconContainer style={{top: 20, right: 20}} onPress={handleDelete}>
        <MaterialIcons
          name="delete"
          size={24}
          color={colors.alert}
        />
        </IconContainer>
        {fetchedPlant ? (
          <Formik
            initialValues={{
              name: fetchedPlant.name,
              description: fetchedPlant.description || '',
              image: fetchedPlant.image || '',
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                />
                <BasicTextInput
                  value={values.description}
                  label="Description"
                  placeholder="Enter your plant description..."
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  textarea={true}
                />
                <View style={{ marginTop: 50 }}>
                  <BasicButton
                    onPress={handleSubmit as (values: any) => void}
                    text="Submit changes"
                  />
                </View>
              </InputsWrapper>
            )}
          </Formik>
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default EditPlant;
