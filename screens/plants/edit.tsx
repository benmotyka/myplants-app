import React, { useState } from "react";
import { Formik } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageInfo } from "expo-image-picker";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

import Back from "components/Back";
import BasicModal from "components/BasicModal";
import BasicTextInput from "components/BasicTextInput";
import BasicImageInput from "components/BasicImageInput";
import BasicButton from "components/BasicButton";
import Loader from "components/Loader";
import {
  ModalHeader,
  ModalItem,
} from "components/BasicModal/styles";
import { createEditPlantSchema } from "schemas/EditPlant.schema";
import {
  ColumnCenterWrapper,
  InputsWrapper,
  IconContainer,
  Description,
  KeyboardScreen,
} from "styles/shared";
import { formatToHourDateAndYear } from "util/date";
import { ApiErrors } from "enums/api-errors";
import { base64EncodeImage } from "util/images";
import BasicCheckbox from "components/BasicCheckbox";
import { AnimatePresence, MotiView } from "moti";
import WateringReminderInput from "components/WateringReminderInput";
import { useToastStore } from "store";
import { ICON_SIZE_PX } from "config";
import { deletePlant, editPlant } from "services/plant";
import { useGetPlantDetailsFromCache } from "hooks/useGetPlantDetailsFromCache";
import i18n from "../../i18n";
import { RootStackParamList } from "../../App";


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
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<ImageInfo>();
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();

  const displayToast = useToastStore((state) => state.showToast);

  const { isReminderChecked, plant: selectedPlant, setReminderChecked } = useGetPlantDetailsFromCache(plantId)

  const handleDelete = async () => {
    try {
      await deletePlant(plantId);
      displayToast({
        text: t("pages.plants.edit.plantDeletedSuccess"),
        type: "success",
      });
    } catch (error) {
      console.error(error);
      return displayToast({ text: t("errors.general"), type: "error" });
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

      await editPlant({
        id: plantId,
        name: values.name,
        description: values.description,
        image: base64EncodedImage,
        ...(isReminderChecked && {
          wateringReminderFrequency,
        }),
      });
      navigation.navigate("home");
      displayToast({ text: t("pages.plants.edit.success"), type: "success" });
    } catch (error) {
      console.log(error);
      switch (error) {
        case ApiErrors.INVALID_FILE:
          return displayToast({
            text: t("errors.invalidFileType"),
            type: "error",
          });
        default:
          return displayToast({ text: t("errors.general"), type: "error" });
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
      !!selectedPlant.wateringReminderFrequency === isReminderChecked &&
      (!isReminderChecked ||
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
        style={{
          backgroundColor: theme.background,
        }}
      >
        <ColumnCenterWrapper>
          <Back navigation={navigation} />
          <IconContainer
            style={{ top: 20, right: 20 }}
            onPress={() => {
              setShowModal(true);
            }}
          >
            <MaterialIcons
              name="delete"
              size={ICON_SIZE_PX}
              color={theme.warning}
            />
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
              validationSchema={() => createEditPlantSchema(isReminderChecked)}
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
                    isChecked={isReminderChecked}
                    setChecked={setReminderChecked}
                  />
                  <AnimatePresence>
                    {isReminderChecked ? (
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
