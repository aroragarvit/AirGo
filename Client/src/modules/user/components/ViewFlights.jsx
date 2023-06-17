import { Box, Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { MdFlight } from "react-icons/md";

export const ViewFlights = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    data && (
      <Box mt={8}>
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
            key={flight.id}
            mb={4}
          >

            <Flex align={"center"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                    {flight.departureTime} - {flight.arrivalTime}
                </Text> 
            </Flex>

            <Flex align={"center"}>
              <MdFlight size={24} />
              <Text ml={4}>{flight.id}</Text>
            </Flex>
            <Flex align={"center"}>
              <Text fontSize={"xl"} fontWeight={"semibold"}>
                ₹ {flight.cost}
              </Text>
              <Button colorScheme={"blue"} ml={8}>
                Book
              </Button>
            </Flex>
          </Flex>
        ))}
      </Box>
    )
  );
};
