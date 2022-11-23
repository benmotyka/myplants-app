import React, { ReactElement } from "react";
import { Modal } from "react-native";

import { ModalWrapper, ModalContainer, ModalBackground } from "./styles";

interface Props {
  showModal: boolean;
  children: ReactElement | ReactElement[];
  toggleModal: (...args: any[]) => void;
}

const BasicModal = ({
  showModal,
  children,
  toggleModal,
}: Props): JSX.Element => {
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
