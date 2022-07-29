import React from "react";
import { Formik, FormikHelpers } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { RootStackParamList } from "../../App";
import plantsApi from "config/api/plants";
import Back from "components/Back/Back";
import BasicModal from "components/BasicModal/BasicModal";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import BasicImageInput from "components/BasicImageInput/BasicImageInput";
import BasicButton from "components/BasicButton/BasicButton";
import Loader from "components/Loader/Loader";
import {
  ModalHeader,
  ModalItem,
} from "components/BasicModal/BasicModal.styles";
import { Plant } from "interfaces/Plant";
import { UserDetails } from "interfaces/UserDetails";
import { EditPlantSchema } from "schemas/EditPlant.schema";
import { State } from "store/reducers";
import {
  ColumnCenterWrapper,
  InputsWrapper,
  IconContainer,
  MarginTopView,
  Description,
  KeyboardScreen,
} from "styles/shared";
import { colors } from "styles/colors";
import { formatToHourAndDate } from "util/date";
import showToast from "util/showToast";

type EditPlantProps = NativeStackScreenProps<RootStackParamList, "editPlant">;

interface EditPlantForm {
  name: string;
  description?: string;
  image?: string;
}

const EditPlant = ({ route, navigation }: EditPlantProps): JSX.Element => {
  const plantId = route.params.plantId;
  const [loading, setLoading] = React.useState(false);
  const [selectedPlant, setSelectedPlant] = React.useState<Plant>();
  const [showModal, setShowModal] = React.useState(false);
  const { userPlants }: { userPlants: Plant[] } = useSelector(
    (state: State) => state.plants
  );
  const { userDetails }: { userDetails: UserDetails } = useSelector(
    (state: State) => state.user
  );

  React.useEffect(() => {
    const plant = userPlants.find((plant) => plant.id === plantId);
    setSelectedPlant(plant);
  }, [userPlants]);

  const handleDelete = async () => {
    try {
      await plantsApi.delete(`/plants/${plantId}`, {
        headers: {
          Authorization: `Bearer ${userDetails.jwt}`,
        },
      });
      showToast("Plant deleted", "success");
    } catch (error) {
      console.error(error);
      showToast("Something went wrong. Please try again later", "error");
    } finally {
      navigation.navigate("home");
    }
  };

  const handleEdit = async (
    values: EditPlantForm,
    {
      setFieldError,
    }: {
      setFieldError: FormikHelpers<EditPlantForm>["setFieldError"];
    }
  ) => {
    try {
      setLoading(true);
      await plantsApi.put(
        `/plants`,
        {
          id: plantId,
          name: values.name,
          description: values.description,
          ...(selectedPlant?.imgSrc !== values.image && { imageSrc: values.image }),
        },
        {
          headers: {
            Authorization: `Bearer ${userDetails.jwt}`,
          },
        }
      );
      showToast("Plant edited", "success");
    } catch (error) {
      console.error(error);
      showToast("Something went wrong. Please try again later", "error");
    } finally {
      setLoading(false);
      navigation.navigate("home");
    }
  };

  return (
    <>
      <KeyboardScreen
        contentContainerStyle={{ paddingBottom: 50 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        bounces={false}
      >
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
          {selectedPlant && !loading ? (
            <Formik
              initialValues={{
                name: selectedPlant.name,
                description: selectedPlant.description,
                image: selectedPlant.imgSrc,
              }}
              validationSchema={EditPlantSchema}
              onSubmit={handleEdit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <InputsWrapper>
                  <BasicImageInput
                  buttonText="Edit picture"
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
                  <Description>
                    Created at {formatToHourAndDate(selectedPlant.createdAt)}
                  </Description>
                  <MarginTopView>
                    <BasicButton
                      onPress={handleSubmit as (values: any) => void}
                      text="Submit changes"
                      disabled={
                        selectedPlant.name === values.name &&
                        selectedPlant.description === values.description &&
                        selectedPlant.imgSrc === values.image
                      }
                    />
                  </MarginTopView>
                </InputsWrapper>
              )}
            </Formik>
          ) : (
            <Loader />
          )}
        </ColumnCenterWrapper>
      </KeyboardScreen>
      <BasicModal showModal={showModal} toggleModal={setShowModal}>
        <ModalItem>
          <ModalHeader>Are you sure to delete your plant?</ModalHeader>
        </ModalItem>
        <ModalItem>
          <BasicButton onPress={handleDelete} text="Delete" warning={true} />
        </ModalItem>
        <ModalItem>
          <BasicButton
            onPress={() => {
              setShowModal(false);
            }}
            text="Cancel"
          />
        </ModalItem>
      </BasicModal>
    </>
  );
};

export default EditPlant;
