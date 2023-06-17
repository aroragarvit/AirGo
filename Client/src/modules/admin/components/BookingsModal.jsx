import {
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  Text,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

export const BookingsModal = ({ isOpen, onClose, bookings }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={["full", null, "3xl", "4xl"]}>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader textAlign={"center"}>Booked Users</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {bookings ? (
            <Box>
              {bookings.map((booking) => (
                <Flex
                  bg={useColorModeValue("gray.100", "gray.900")}
                  p={[4, null, 8]}
                  w={"full"}
                  rounded="2xl"
                  justify={"space-between"}
                  alignItems={"center"}
                  key={booking._id}
                  mb={6}
                >
                  <Text fontSize={"xl"} fontWeight={"semibold"}>
                    {booking.user.email}
                  </Text>

                  <Flex align={"center"}>
                    <Text fontSize={"xl"} fontWeight={"semibold"}>
                      {booking.user.username}
                    </Text>
                  </Flex>

                  <Flex align={"center"}>
                    <Text fontSize={"xl"}>Seats Booked:</Text>
                    <Text ml={4} fontWeight={"semibold"}>
                      {booking.seatsBooked}
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Box>
          ) : (
            <Text textAlign={"center"}>No Bookings</Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
