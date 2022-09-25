import React from "react";

import { BasicModalProps } from "components/BasicModal/BasicModal.interface";
import {
  ModalWrapper,
  ModalContainer,
  ModalBackground,
} from "components/BasicModal/BasicModal.styles";
import { Modal } from "react-native";

const BasicModal = ({
  showModal,
  children,
  toggleModal,
}: BasicModalProps): JSX.Element => {
  return (
    <Modal animationType="fade" visible={showModal} transparent>
      <ModalContainer>
      <ModalBackground onPress={() => toggleModal(false)} activeOpacity={1} />
      <ModalWrapper>{children}</ModalWrapper>
      </ModalContainer>
    </Modal>
  );
};

export default BasicModal;
