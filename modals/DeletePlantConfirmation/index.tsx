import React from "react";
import BasicModal from "components/BasicModal";
import {
    ModalHeader,
    ModalItem,
} from "components/BasicModal/styles";
import BasicButton from "components/BasicButton";
import i18n from "config/i18n";

interface Props {
    showModal: boolean;
    toggleModal: (state: boolean) => void;
    handleDelete: () => void;
}

const DeletePlantConfirmationModal = ({
    showModal,
    toggleModal,
    handleDelete,
}: Props) => {
    const { t } = i18n;

    return (
        <BasicModal showModal={showModal} toggleModal={toggleModal}>
            <ModalItem>
                <ModalHeader>
                    {t("pages.plants.edit.deletePlantConfirmation")}
                </ModalHeader>
            </ModalItem>
            <ModalItem>
                <BasicButton
                    onPress={handleDelete}
                    text={t("common.delete")}
                    warning={true}
                />
            </ModalItem>
            <ModalItem>
                <BasicButton
                    onPress={() => toggleModal(false)}
                    text={t("common.cancel")}
                />
            </ModalItem>
        </BasicModal>
    );
};

export default DeletePlantConfirmationModal;
