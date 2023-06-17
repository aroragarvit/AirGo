import {
    Modal,
    ModalCloseButton,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalBody,
    Text,
  } from "@chakra-ui/react"
  
  export const BookingsModal = ({ isOpen, onClose }) => {  
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={["full", null, "3xl", "4xl"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Your Booked Flights</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4} fontSize={"xl"}>
             Have a safe journey!
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  