import React, { Dispatch, SetStateAction, useState } from "react";
import BasicModal from "components/BasicModal";
import { ModalImage } from "components/BasicModal/styles";
import { useTheme } from "styled-components/native";
import { ICON_SIZE_PX } from "config";
import { MaterialIcons } from "@expo/vector-icons";
import DeleteAttachmentConfirmationModal from "modals/DeleteAttachmentConfirmation";
import { ImageData } from "interfaces";
import i18n from "config/i18n";
import { deleteImageFromPlant } from "services/plant";
import { DeleteButtonWrapper } from "./styles";
import { showToast } from "utils/index";

interface Props {
    showModal: boolean;
    toggleModal: Dispatch<SetStateAction<ImageData | null>>;
    selectedImage: ImageData | null;
    refetchPlantImagesHistory: () => Promise<void>;
}

const { t } = i18n;

const PlantImageModal = ({
    showModal,
    toggleModal,
    selectedImage,
    refetchPlantImagesHistory,
}: Props) => {
    const theme = useTheme();

    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
        useState(false);

    const handleDelete = async () => {
        try {
            await deleteImageFromPlant(selectedImage?.id as string);
            showToast({
                text1: t("pages.plants.history.imageDeleted"),
                type: "success",
            })
            await refetchPlantImagesHistory();
        } catch (error) {
            showToast({
                text1: t("errors.general"),
                text2: t("errors.generalDescription"),
                type: "error",
            })
        } finally {
            toggleModal(null);
            setShowDeleteConfirmationModal(false);
        }
    };

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
                handleDelete={handleDelete}
            />
        </>
    );
};

export default PlantImageModal;
