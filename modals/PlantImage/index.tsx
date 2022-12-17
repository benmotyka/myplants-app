import React from "react";
import BasicModal from "components/BasicModal";
import { ModalImage } from "components/BasicModal/styles";

interface Props {
    showModal: boolean;
    toggleModal: (imageUri: string | boolean) => void;
    imageUri: string;
}

const PlantImageModal = ({ showModal, toggleModal, imageUri }: Props) => {
    return (
        <BasicModal showModal={showModal} toggleModal={toggleModal}>
            <ModalImage source={{ uri: imageUri }} />
        </BasicModal>
    );
};

export default PlantImageModal;
