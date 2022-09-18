import React from "react";
import { Formik } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { ImageInfo } from "expo-image-picker";
import { View } from "react-native";

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
import { createEditPlantSchema } from "schemas/EditPlant.schema";
import { State } from "store/reducers";
import {
  ColumnCenterWrapper,
  InputsWrapper,
  IconContainer,
  Description,
  KeyboardScreen,
} from "styles/shared";
import { colors } from "styles/colors";
import { formatToHourDateAndYear } from "util/date";
import showToast from "util/showToast";
import { ApiErrors } from "enums/api-errors";
import { base64EncodeImage } from "util/images";
import i18n from "../../i18n";
import BasicCheckbox from "components/BasicCheckbox/BasicCheckbox";
import { AnimatePresence, MotiView } from "moti";
import WateringReminderInput from "components/WateringReminderInput/WateringReminderInput";

type EditPlantProps = NativeStackScreenProps<RootStackParamList, "editPlant">;

interface EditPlantForm {
  name: string;
  description?: string;
  image?: string;
  wateringReminderFrequency?: number;
}

const { t } = i18n;

const EditPlant = ({ route, navigation }: EditPlantProps): JSX.Element => {
  const plantId = route.params.plantId;
  const [loading, setLoading] = React.useState(false);
  const [isRemindersChecked, setRemindersChecked] = React.useState(false);
  const [image, setImage] = React.useState<ImageInfo>();
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
    setRemindersChecked(!!plant?.wateringReminderFrequency);
  }, [userPlants]);

  const handleDelete = async () => {
    try {
      await plantsApi.delete(`/plants/${plantId}`);
      showToast(t("pages.plants.edit.plantDeletedSuccess"), "success");
    } catch (error) {
      console.error(error);
      showToast(t("errors.general"));
    } finally {
      navigation.navigate("home");
    }
  };

  const handleEdit = async (values: EditPlantForm) => {
    try {
      setLoading(true);
      const base64EncodedImage = image ? base64EncodeImage(image) : null;

      // Workaround for ReactNative TextField working only on strings
      const wateringReminderFrequency =
        typeof values.wateringReminderFrequency === "string"
          ? parseInt(values.wateringReminderFrequency)
          : values.wateringReminderFrequency;

      await plantsApi.put(
        `/plants`,
        {
          id: plantId,
          name: values.name,
          description: values.description,
          ...(image && { imageSrc: base64EncodedImage }),
          ...(isRemindersChecked && {
            wateringReminderFrequency,
          }),
        }
      );
      navigation.navigate("home");
      showToast(t("pages.plants.edit.success"), "success");
    } catch (error) {
      console.log(error);
      switch (error) {
        case ApiErrors.INVALID_FILE:
          return showToast(t("errors.invalidFileType"), "error");
        default:
          return showToast(t("errors.general"), "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const checkIfButtonShouldBeDisabled = (values: EditPlantForm) => {
    if (!selectedPlant) return true;

    return (
      selectedPlant.name === values.name &&
      selectedPlant.description === values.description &&
      !image &&
      !!selectedPlant.wateringReminderFrequency === isRemindersChecked &&
      (!isRemindersChecked ||
        selectedPlant.wateringReminderFrequency ==
          values.wateringReminderFrequency)
    );
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
                wateringReminderFrequency:
                  selectedPlant.wateringReminderFrequency || 1,
              }}
              validationSchema={() => createEditPlantSchema(isRemindersChecked)}
              onSubmit={handleEdit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <InputsWrapper>
                  <BasicImageInput
                    buttonText={t("pages.plants.edit.editPicture")}
                    image={image ?? { uri: values.image }}
                    setImage={setImage}
                  />
                  <BasicTextInput
                    value={values.name}
                    label={t("common.name")}
                    placeholder={t("pages.plants.edit.plantNamePlaceholder")}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    error={errors.name}
                  />
                  <BasicTextInput
                    value={values.description}
                    label={t("common.description")}
                    placeholder={t(
                      "pages.plants.edit.plantDescriptionPlaceholder"
                    )}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    textarea={true}
                    error={errors.description}
                  />
                  <BasicCheckbox
                    label={t("pages.plants.edit.remindWateringLabel")}
                    isChecked={isRemindersChecked}
                    setChecked={setRemindersChecked}
                  />
                  <AnimatePresence>
                    {isRemindersChecked ? (
                      <MotiView
                        style={{ paddingTop: 20, width: "100%" }}
                        from={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                      >
                        <WateringReminderInput
                          numberValue={values.wateringReminderFrequency}
                          setNumberValue={handleChange(
                            "wateringReminderFrequency"
                          )}
                          error={errors.wateringReminderFrequency}
                        />
                      </MotiView>
                    ) : null}
                  </AnimatePresence>
                  <View style={{ marginVertical: 30 }}>
                    <BasicButton
                      onPress={handleSubmit as (values: unknown) => void}
                      text={t("pages.plants.edit.submit")}
                      disabled={checkIfButtonShouldBeDisabled(values)}
                    />
                  </View>
                  <Description>
                    {t("pages.plants.edit.createdAt", {
                      date: formatToHourDateAndYear(selectedPlant.createdAt),
                    })}
                  </Description>
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
          <ModalHeader>
            {t("pages.plants.edit.deletePlantConfirmation")}
          </ModalHeader>
        </ModalItem>
        <ModalItem>
          <BasicButton
            onPress={handleDelete}
            text={t("common.delete")}
            warning={true}
          />
        </ModalItem>
        <ModalItem>
          <BasicButton
            onPress={() => {
              setShowModal(false);
            }}
            text={t("common.cancel")}
          />
        </ModalItem>
      </BasicModal>
    </>
  );
};

export default EditPlant;
