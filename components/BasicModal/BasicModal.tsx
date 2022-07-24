import React from "react";

import { BasicModalProps } from "components/BasicModal/BasicModal.interface";
import {
  ModalWrapper,
  ModalContainer,
} from "components/BasicModal/BasicModal.styles";
import { AnimatePresence } from "moti";
import { ModalAnimationWrapper } from "styles/shared";

const BasicModal = ({
  showModal,
  children,
  toggleModal,
}: BasicModalProps): JSX.Element => {
  return (
    <AnimatePresence>
      {showModal ? (
        <ModalAnimationWrapper
          from={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <ModalContainer onPress={() => toggleModal(false)} activeOpacity={1}>
            <ModalWrapper>{children}</ModalWrapper>
          </ModalContainer>
        </ModalAnimationWrapper>
      ) : null}
    </AnimatePresence>
  );
};

export default BasicModal;
