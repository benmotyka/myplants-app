import React, { useEffect } from "react";
import BasicModal from "components/BasicModal";
import { ModalHeader, ModalItem } from "components/BasicModal/styles";
import BasicButton from "components/BasicButton";
import { redirectToStore } from "util/app";
import i18n from "config/i18n";
import { useAppConfigStore } from "store";

interface Props {
    showModal: boolean;
    toggleModal: (state: boolean) => void;
}

const RateAppModal = ({ showModal, toggleModal }: Props) => {
    const { t } = i18n;
    const { setRateAppModalShown } = useAppConfigStore.persistent(
        (state) => state
    );

    useEffect(() => {
        if (showModal) setRateAppModalShown(true);
    }, [showModal]);

    return (
        <BasicModal showModal={showModal} toggleModal={toggleModal}>
            <ModalItem>
                <ModalHeader>rate ap pls</ModalHeader>
            </ModalItem>
        </BasicModal>
    );
};

export default RateAppModal;
