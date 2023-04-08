import React from "react";
import BasicModal from "components/BasicModal";
import { ModalHeader, ModalItem } from "components/BasicModal/styles";
import BasicButton from "components/BasicButton";
import i18n from "config/i18n";

interface Props {
    attachmentId?: string;
    showModal: boolean;
    toggleModal: (state: boolean) => void;
    handleDelete: () => void;
}

const { t } = i18n;

const DeleteAttachmentConfirmationModal = ({
    handleDelete,
    showModal,
    toggleModal,
}: Props) => {
    return (
        <BasicModal showModal={showModal} toggleModal={toggleModal}>
            <ModalItem>
                <ModalHeader>
                    {t("pages.plants.history.deleteImageConfirmation")}
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

export default DeleteAttachmentConfirmationModal;
