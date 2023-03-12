import React, { useState } from "react";
import BasicModal from "components/BasicModal";
import { ModalImage } from "components/BasicModal/styles";
import { useTheme } from "styled-components/native";
import { ICON_SIZE_PX } from "config";
import { MaterialIcons } from "@expo/vector-icons";
import { DeleteButtonWrapper } from "./styles";
import DeleteAttachmentConfirmationModal from "modals/DeleteAttachmentConfirmation";

interface Props {
    showModal: boolean;
    toggleModal: (imageUri: string | boolean) => void;
    imageUri: string;
}

const PlantImageModal = ({ showModal, toggleModal, imageUri }: Props) => {
    const theme = useTheme();
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
        useState(false);

    return (
        <>
            <BasicModal showModal={showModal} toggleModal={toggleModal}>
                <ModalImage source={{ uri: imageUri }} />
                <DeleteButtonWrapper>
                    <MaterialIcons
                        name="delete"
                        size={ICON_SIZE_PX}
                        color={theme.warning}
                    />
                </DeleteButtonWrapper>
            </BasicModal>
            <DeleteAttachmentConfirmationModal
                showModal={showDeleteConfirmationModal}
                toggleModal={setShowDeleteConfirmationModal}
            />
        </>
    );
};

export default PlantImageModal;
