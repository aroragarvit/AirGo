import { Box, Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { MdFlight } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IconButton } from "@chakra-ui/react";

export const ViewFlights = ({ data, setData }) => {
  useEffect(() => {
    console.log("Admin ka" ,data);
  }, [data]);
  return (
    data && (
      <Box mt={8} >
        <Text textAlign={"center"} mb={4} fontSize={"2xl"}>
          Search Results
        </Text>
        {data.map((flight) => (
          <Flex
            bg={useColorModeValue("gray.100", "gray.900")}
            p={[4, null, 8]}
            w={["full", null, "3xl", "4xl"]}
            rounded="2xl"
            justify={"space-between"}
            alignItems={"center"}
            key={flight._id}
            mb={4}
          >
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              {flight.departure.slice(0, 10)}
            </Text>

            <Flex align={"center"}>
              <Text fontSize={"xl"} fontWeight={"semibold"}>
                {flight.source} - {flight.destination}
              </Text>
            </Flex>

            <Flex align={"center"}>
              <MdFlight size={24} />
              <Text ml={4}>{flight.flightName}</Text>
            </Flex>
            <Flex align={"center"}>
              <Text fontSize={"xl"} fontWeight={"semibold"}>
                ₹ {flight.price}
              </Text>
              <Button
                colorScheme={"blue"}
                ml={8}
              >
                View Bookings
              </Button>
            </Flex>
          </Flex>
        ))}
      </Box>
    )
  );
};
