import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
  Image,
  Text,
} from "@chakra-ui/react";
import { Eye } from "phosphor-react";
import * as React from "react";

import { IUser } from "../context/chatContext";

export interface IProfileModalProps {
  user: IUser;
  children: React.ReactNode;
}

export default function ProfileModal({ user, children }: IProfileModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          aria-label="View Profile"
          display={{ base: "flex" }}
          icon={<Eye size={24} color="#030303" />}
          onClick={onOpen}
        />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="26.125rem">
          <ModalHeader
            fontSize="1.5rem"
            fontFamily="Roboto"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="9.375rem"
              src={user.picture}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "1.5rem", md: "1.5rem" }}
              fontFamily="Roboto"
            >
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
