import React from "react";
import BasicModal from "components/BasicModal";
import { ModalHeader, ModalItem } from "components/BasicModal/styles";
import BasicButton from "components/BasicButton";
import i18n from "config/i18n";
import { redirectToStore } from "util/app";

interface Props {
    showModal: boolean;
    toggleModal: (state: boolean) => void;
    onClose: () => void;
}

const NewUpdateModal = ({ showModal, toggleModal, onClose }: Props) => {
    const { t } = i18n;

    const redirectToUpdate = () => {
        redirectToStore();
        toggleModal(false);
    };

    return (
        <BasicModal
            showModal={showModal}
            toggleModal={toggleModal}
            onClose={onClose}
        >
            <ModalItem>
                <ModalHeader>{t("pages.homepage.newUpdateHeader")}</ModalHeader>
            </ModalItem>
            <ModalItem>
                <BasicButton
                    onPress={redirectToUpdate}
                    text={t("common.update")}
                    important
                />
            </ModalItem>
            <ModalItem>
                <BasicButton onPress={onClose} text={t("common.cancel")} />
            </ModalItem>
        </BasicModal>
    );
};

export default NewUpdateModal;
