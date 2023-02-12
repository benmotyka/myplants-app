import React from "react";
import BasicModal from "components/BasicModal";
import {
    ModalHeader,
    ModalItem,
    ModalDescription,
} from "components/BasicModal/styles";
import i18n from "config/i18n";

interface Props {
    showModal: boolean;
    toggleModal: (state: boolean) => void;
}

const NoConnectionModal = ({ showModal, toggleModal }: Props) => {
    const { t } = i18n;

    return (
        <BasicModal showModal={showModal} toggleModal={toggleModal}>
            <ModalItem>
                <ModalHeader>
                    {t("components.noConnectionModal.header")}
                </ModalHeader>
                <ModalDescription textCenter>
                    {t("components.noConnectionModal.description")}
                </ModalDescription>
            </ModalItem>
        </BasicModal>
    );
};

export default NoConnectionModal;
