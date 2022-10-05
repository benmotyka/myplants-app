import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import BasicButton from "components/BasicButton/BasicButton";
import {
  InputWrapper,
  InputImage,
} from "components/BasicImageInput/BasicImageInput.styles";
import { BasicImageInputProps } from "components/BasicImageInput/BasicImageInput.interface";
import BasicModal from "components/BasicModal/BasicModal";
import { ModalItem } from "components/BasicModal/BasicModal.styles";
import i18n from "../../i18n";

const BasicImageInput = ({
  image,
  setImage,
  buttonText,
}: BasicImageInputProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  const { t } = i18n;

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      type: "image",
    });

    if (!result.cancelled) {
      setImage(result);
    }
    setShowModal(false);
  };

  const handleTakePhoto = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result);
    }
    setShowModal(false);
  };

  return (
    <>
      <InputWrapper>
        <InputImage
          source={
            image?.uri
              ? { uri: image.uri }
              : require("../../assets/plants/default_plant.jpg")
          }
        />
        <BasicButton onPress={() => setShowModal(true)} text={buttonText} />
      </InputWrapper>
      {showModal ? (
        <BasicModal showModal={showModal} toggleModal={setShowModal}>
          <ModalItem>
            <BasicButton
              onPress={handleTakePhoto}
              text={t("components.basicImageInput.takePhoto")}
            />
          </ModalItem>
          <ModalItem>
            <BasicButton
              onPress={handlePickImage}
              text={t("components.basicImageInput.chooseLibrary")}
            />
          </ModalItem>
        </BasicModal>
      ) : null}
    </>
  );
};

export default BasicImageInput;
