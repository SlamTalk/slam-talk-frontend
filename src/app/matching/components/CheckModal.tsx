import React from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';

const CheckModal = ({
  isOpen,
  onClose,
  title,
  content,
  leftBtn,
  rightBtn,
  leftFunc,
  rightFunc,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  leftBtn: string;
  rightBtn: string;
  leftFunc: () => void;
  rightFunc: () => void;
}) => (
  <Modal isOpen={isOpen} onClose={onClose} placement="center">
    <ModalContent>
      {() => (
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>
            <p>{content}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={leftFunc}>
              {leftBtn}
            </Button>
            <Button color="primary" onPress={rightFunc}>
              {rightBtn}
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);

export default CheckModal;
