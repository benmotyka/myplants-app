import React from "react";
import * as ImagePicker from "expo-image-picker";

import BasicButton from "components/BasicButton/BasicButton";
import { InputWrapper, InputImage } from "components/BasicImageInput/BasicImageInput.styles";
import { BasicImageInputProps } from "components/BasicImageInput/BasicImageInput.interface";

const BasicImageInput = ({image, setImage, buttonText}: BasicImageInputProps): JSX.Element => {

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      //@TODO: add checking if its mobile/web, if web then result.uri otherwise result.base64 + prepare string
      // setImage(`data:image/jpeg;base64${result.base64}`);
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
      <BasicButton onPress={pickImage as (values: any) => void} text={buttonText} />
    </InputWrapper>
  );
};

export default BasicImageInput;
