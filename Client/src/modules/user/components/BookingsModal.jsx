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
import { MdFlight } from "react-icons/md";
import { useEffect, useState } from "react";
import { mybookings } from "../services/mybookings";

export const BookingsModal = ({ isOpen, onClose }) => {
  const [bookings, setBookings] = useState(null);
  useEffect(() => {
    if (!isOpen) return;
    mybookings().then((data) => {
      setBookings(data.bookings);
    });
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={["full", null, "3xl", "4xl"]}>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader textAlign={"center"}>Your Booked Flights</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {bookings ? (
            <Box>
              {bookings.map((flight) => (
                <Flex
                  bg={useColorModeValue("gray.100", "gray.900")}
                  p={[4, null, 8]}
                  w={"full"}
                  rounded="2xl"
                  justify={"space-between"}
                  alignItems={"center"}
                  key={flight.flight._id}
                  mb={6}
                >
                  <Text fontSize={"xl"} fontWeight={"semibold"}>
                    {flight.flight.departure.slice(0, 10)}
                  </Text>

                  <Flex align={"center"}>
                    <Text fontSize={"xl"} fontWeight={"semibold"}>
                      {flight.flight.source} - {flight.flight.destination}
                    </Text>
                  </Flex>

                  <Flex align={"center"}>
                    <MdFlight size={24} />
                    <Text ml={4}>{flight.flight.flightName}</Text>
                  </Flex>
                  <Flex align={"center"}>
                    <Text fontSize={"xl"}>Seats Booked:</Text>
                    <Text ml={4} fontWeight={"semibold"}>
                      {flight.seatsBooked}
                    </Text>
                  </Flex>
                  <Flex align={"center"}>
                    <Text fontSize={"xl"} fontWeight={"semibold"}>
                      ₹ {flight.flight.price * flight.seatsBooked}
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
