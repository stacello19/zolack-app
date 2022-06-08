import React from 'react';
import { ModalWrapper, ModalContent, ModalHeader, ModalBody, Title, Close } from './styles';

const Modal = ({ modal, setModal, title, children }: { modal: boolean; setModal: (e: any) => void; title: string; children: React.ReactNode }) => {
  return (
    <ModalWrapper modal={modal}>
      <ModalContent>
        <ModalHeader>
          <Title>{title}</Title>
          <Close onClick={() => setModal(false)}>&times;</Close>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </ModalWrapper>
  )
};

export default Modal;