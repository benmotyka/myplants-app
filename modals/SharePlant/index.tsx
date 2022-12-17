import React from "react";
import BasicModal from "components/BasicModal";
import {
    ModalDescription,
    ModalHeader,
    ModalItem,
} from "components/BasicModal/styles";
import CopyField from "components/CopyField";
import i18n from "config/i18n";

interface Props {
    showModal: boolean;
    toggleModal: (state: boolean) => void;
    shareId: string;
}

const SharePlantModal = ({ showModal, toggleModal, shareId }: Props) => {
    const { t } = i18n;

    return (
        <BasicModal showModal={showModal} toggleModal={toggleModal}>
            <ModalItem>
                <ModalHeader>
                    {t("pages.plants.history.shareModal.header")}
                </ModalHeader>
                <ModalDescription>
                    {t("pages.plants.history.shareModal.description")}
                </ModalDescription>
            </ModalItem>
            <ModalItem>
                <CopyField value={shareId} />
            </ModalItem>
        </BasicModal>
    );
};

export default SharePlantModal;
