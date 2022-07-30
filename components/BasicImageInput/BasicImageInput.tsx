import React from "react";
import * as ImagePicker from "expo-image-picker";

import BasicButton from "components/BasicButton/BasicButton";
import {
  InputWrapper,
  InputImage,
} from "components/BasicImageInput/BasicImageInput.styles";
import { BasicImageInputProps } from "components/BasicImageInput/BasicImageInput.interface";

const BasicImageInput = ({
  image,
  setImage,
  buttonText,
}: BasicImageInputProps): JSX.Element => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      type: "image",
    });
    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <InputWrapper>
      <InputImage
        source={
          image?.uri
            ? { uri: image.uri }
            : require("../../assets/plants/default_plant.webp")
        }
      />
      <BasicButton
        onPress={pickImage}
        text={buttonText}
      />
    </InputWrapper>
  );
};

export default BasicImageInput;
