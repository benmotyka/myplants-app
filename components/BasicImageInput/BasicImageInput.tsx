import React from "react";
import * as ImagePicker from "expo-image-picker";
import { InputWrapper, InputImage } from "./BasicImageInput.styles";
import BasicButton from "../BasicButton/BasicButton";
import { BasicImageInputProps } from "./BasicImageInput.interface";

const BasicImageInput = ({image, setImage}: BasicImageInputProps): JSX.Element => {

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <InputWrapper>
      {image ? (
        <InputImage
          source={{ uri: image }}
        />
      ) : (
        <InputImage
          source={require("../../assets/plants/default_plant.webp")}
        />
      )}
      <BasicButton onPress={pickImage as (values: any) => void} text="Upload picture" />
    </InputWrapper>
  );
};

export default BasicImageInput;
