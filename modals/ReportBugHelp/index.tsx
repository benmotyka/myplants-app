import React from "react";
import BasicModal from "components/BasicModal";
import { ModalItem } from "components/BasicModal/styles";
import BasicButton from "components/BasicButton";
import i18n from "config/i18n";
import { Description } from "styles/shared";

interface Props {
    showModal: boolean;
    toggleModal: (state: boolean) => void;
}

const ReportBugHelpModal = ({ showModal, toggleModal }: Props) => {
    const { t } = i18n;

    return (
        <BasicModal showModal={showModal} toggleModal={toggleModal}>
            <ModalItem>
                <Description>
                    {t("pages.settings.reportBug.description")}
                </Description>
            </ModalItem>
            <ModalItem>
                <BasicButton
                    onPress={() => toggleModal(false)}
                    text={t("common.close")}
                />
            </ModalItem>
        </BasicModal>
    );
};

export default ReportBugHelpModal;
