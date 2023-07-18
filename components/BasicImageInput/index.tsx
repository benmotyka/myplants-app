import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import BasicButton from "components/BasicButton";
import { InputWrapper, InputImage } from "components/BasicImageInput/styles";
import i18n from "config/i18n";
import AddPhotoSourceModal from "modals/AddPhotoSource";

interface Props {
    buttonText: string;
    image?: ImagePicker.ImageInfo | { uri: string | undefined } | null;
    setImage: React.Dispatch<React.SetStateAction<any>>;
}

const BasicImageInput = ({
    image,
    setImage,
    buttonText,
}: Props): JSX.Element => {
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

        if (!result.canceled) {
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

        if (!result.canceled) {
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
                <BasicButton
                    onPress={() => setShowModal(true)}
                    text={buttonText}
                />
            </InputWrapper>
            <AddPhotoSourceModal
                showModal={showModal}
                toggleModal={setShowModal}
                handleTakePhoto={handleTakePhoto}
                handlePickImage={handlePickImage}
            />
        </>
    );
};

export default BasicImageInput;
