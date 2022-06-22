import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import {
  ScreenContainer,
  ColumnCenterWrapper,
  InputsWrapper,
  IconContainer,
  MarginTopView,
} from "../styles/shared";
import { Formik } from "formik";
import { ActivityIndicator } from "react-native";
import BasicTextInput from "../components/BasicTextInput/BasicTextInput";
import BasicImageInput from "../components/BasicImageInput/BasicImageInput";
import BasicButton from "../components/BasicButton/BasicButton";
import { IPlant } from "../interfaces/IPlant";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import BasicModal from "../components/BasicModal/BasicModal";
import {
  ModalHeader,
  ModalItem,
} from "../components/BasicModal/BasicModal.styles";

type EditPlantProps = NativeStackScreenProps<RootStackParamList, "editPlant">;

const EditPlant = ({ route, navigation }: EditPlantProps): JSX.Element => {
  const plantId = route.params.plantId;
  const [fetchedPlant, setFetchedPlant] = React.useState<IPlant>();
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    // const plant = getPlantById(plantId)
    setFetchedPlant({
      id: plantId,
      name: "kwiat",
      description: "opis mojego kwiatka",
    });
  }, []);

  const handleDelete = () => {
    console.log("delete", plantId);
    navigation.navigate("home");
  };

  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <IconContainer
          style={{ top: 20, right: 20 }}
          onPress={() => {
            setShowModal(true);
          }}
        >
          <MaterialIcons name="delete" size={24} color={colors.alert} />
        </IconContainer>
        {fetchedPlant ? (
          <Formik
            initialValues={{
              name: fetchedPlant.name,
              description: fetchedPlant.description || "",
              image: fetchedPlant.image || "",
            }}
            onSubmit={(values, {resetForm}) => {
              console.log(values);
              navigation.navigate("home");
              resetForm()
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
                <MarginTopView>
                  <BasicButton
                    onPress={handleSubmit as (values: any) => void}
                    text="Submit changes"
                  />
                </MarginTopView>
              </InputsWrapper>
            )}
          </Formik>
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </ColumnCenterWrapper>
      {showModal ? (
        <BasicModal toggleModal={setShowModal}>
            <ModalItem>
              <ModalHeader>Are you sure to delete your plant?</ModalHeader>
            </ModalItem>
            <ModalItem>
              <BasicButton
                onPress={handleDelete}
                text="Delete"
                warning={true}
              />
            </ModalItem>
            <ModalItem>
              <BasicButton onPress={() => {
                setShowModal(false)
              }} text="Cancel" />
            </ModalItem>
        </BasicModal>
      ) : null}
    </ScreenContainer>
  );
};

export default EditPlant;
