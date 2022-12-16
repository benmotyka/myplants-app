import React from "react";
import BasicModal from "components/BasicModal";
import { ModalHeader, ModalItem } from "components/BasicModal/styles";
import BasicButton from "components/BasicButton";
import { redirectToStore } from "util/app";
import i18n from "config/i18n";

interface Props {
    showModal: boolean;
    toggleModal: (state: boolean) => void;
}

const RateAppModal = ({ showModal, toggleModal }: Props) => {
    const { t } = i18n;

    return (
        <BasicModal showModal={showModal} toggleModal={toggleModal}>
            <ModalItem>
                <ModalHeader>{t("pages.homepage.newUpdateHeader")}</ModalHeader>
            </ModalItem>
            <ModalItem>
                <BasicButton
                    onPress={() => redirectToStore()}
                    text={t("common.update")}
                    important
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

export default RateAppModal;
