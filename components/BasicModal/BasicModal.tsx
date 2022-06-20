import React from "react";
import { BasicModalProps } from "./BasicModal.interface";
import { ModalWrapper, ModalContainer } from "./BasicModal.styles";

const BasicModal = ({
  children,
  toggleModal,
}: BasicModalProps): JSX.Element => {
  return (
    <ModalContainer onPress={() => toggleModal(false)}>
      <ModalWrapper>{children}</ModalWrapper>
    </ModalContainer>
  );
};

export default BasicModal;
