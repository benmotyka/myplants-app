import React from "react";
import BasicModal from "components/BasicModal";
import { ModalItem } from "components/BasicModal/styles";
import BasicButton from "components/BasicButton";
import i18n from "config/i18n";

interface Props {
    showModal: boolean;
    toggleModal: (state: boolean) => void;
    handleTakePhoto: () => void;
    handlePickImage: () => void;
}

const AddPhotoSourceModal = ({
    showModal,
    toggleModal,
    handleTakePhoto,
    handlePickImage,
}: Props) => {
    const { t } = i18n;

    return (
        <BasicModal showModal={showModal} toggleModal={toggleModal}>
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
    );
};

export default AddPhotoSourceModal;
