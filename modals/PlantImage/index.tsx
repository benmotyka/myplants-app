import React, { Dispatch, SetStateAction, useState } from "react";
import BasicModal from "components/BasicModal";
import { ModalImage } from "components/BasicModal/styles";
import { useTheme } from "styled-components/native";
import { ICON_SIZE_PX } from "config";
import { MaterialIcons } from "@expo/vector-icons";
import DeleteAttachmentConfirmationModal from "modals/DeleteAttachmentConfirmation";
import { ImageData } from "interfaces/PlantImagesHistoryData";
import { DeleteButtonWrapper } from "./styles";

interface Props {
    showModal: boolean;
    toggleModal: Dispatch<SetStateAction<ImageData | null>>;
    selectedImage: ImageData | null;
}

const PlantImageModal = ({ showModal, toggleModal, selectedImage }: Props) => {
    const theme = useTheme();
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
        useState(false);

    return (
        <>
            <BasicModal showModal={showModal} toggleModal={toggleModal}>
                <ModalImage source={{ uri: selectedImage?.url }} />
                <DeleteButtonWrapper>
                    <MaterialIcons
                        name="delete"
                        size={ICON_SIZE_PX}
                        color={theme.warning}
                        onPress={() => setShowDeleteConfirmationModal(true)}
                    />
                </DeleteButtonWrapper>
            </BasicModal>
            <DeleteAttachmentConfirmationModal
                showModal={showDeleteConfirmationModal}
                toggleModal={setShowDeleteConfirmationModal}
                attachmentId={selectedImage?.id}
            />
        </>
    );
};

export default PlantImageModal;
