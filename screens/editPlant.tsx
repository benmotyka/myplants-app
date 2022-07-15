import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import {
  ColumnCenterWrapper,
  InputsWrapper,
  IconContainer,
  MarginTopView,
  Description,
  KeyboardScreen,
} from "../styles/shared";
import { Formik, FormikHelpers } from "formik";
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
import Loader from "../components/Loader/Loader";
import { useSelector } from "react-redux";
import { State } from "../store/reducers";
import plantsApi from "../config/api/plants";
import { IUserDetails } from "../interfaces/IUserDetails";
import { EditPlantSchema } from "../schemas/EditPlant.schema";
import { standardFormat } from "../util/formatDate";

type EditPlantProps = NativeStackScreenProps<RootStackParamList, "editPlant">;

interface EditPlantForm {
  name: string;
  description?: string;
  image?: string;
}

const EditPlant = ({ route, navigation }: EditPlantProps): JSX.Element => {
  const plantId = route.params.plantId;
  const [loading, setLoading] = React.useState(false);
  const [selectedPlant, setSelectedPlant] = React.useState<IPlant>();
  const [showModal, setShowModal] = React.useState(false);
  const { userPlants }: { userPlants: IPlant[] } = useSelector(
    (state: State) => state.plants
  );
  const { userDetails }: { userDetails: IUserDetails } = useSelector(
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
    } catch (error) {
      console.error(error);
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
          imageSrc: values.image,
        },
        {
          headers: {
            Authorization: `Bearer ${userDetails.jwt}`,
          },
        }
      );
      navigation.navigate("home");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardScreen
      contentContainerStyle={{ paddingBottom: 50 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
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
                  Created at {standardFormat(selectedPlant.createdAt)}
                </Description>
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
          <Loader />
        )}
      </ColumnCenterWrapper>
      {showModal ? (
        <BasicModal toggleModal={setShowModal}>
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
      ) : null}
    </KeyboardScreen>
  );
};

export default EditPlant;
