import { useColorModeValue } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { AiOutlineSwap } from "react-icons/ai";
import { AirportSelect } from "../../../common/AirportSelect";
import { Flex, Box, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { addFlight } from "../services/addFlight";
import { useToast } from "@chakra-ui/react";

export const AddFlight = () => {
  const [data, setData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    seats: null,
    flightName: "",
    price: null,
  });
  const toast = useToast();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} p={[4, null, 8]} w={["full", null, "3xl", "4xl"]} rounded="2xl">
      <Flex w={"full"} justify={"space-between"} flexDir={["column", null, "row"]} align={"center"}>
        <Input
          placeholder="Flight Name"
          type="text"
          w={["full", null, "300px"]}
          my={4}
          onChange={(e) => {
            setData({ ...data, flightName: e.target.value });
          }}
          value={data.flightName ? data.flightName : ""}
          variant={"filled"}
          bgColor={useColorModeValue("gray.200", "gray.700")}
        />
        <Input
          placeholder="Price"
          type="number"
          w={["full", null, "300px"]}
          my={4}
          onChange={(e) => {
            setData({ ...data, price: e.target.value });
          }}
          value={data.price ? data.price : ""}
          variant={"filled"}
          bgColor={useColorModeValue("gray.200", "gray.700")}
        />
      </Flex>
      <Flex w={"full"} justify={"space-between"} flexDir={["column", null, "row"]} align={"center"}>
        <AirportSelect
          label={"Origin"}
          onChange={(e) => {
            setData({
              ...data,
              origin: e.value,
            });
          }}
          data={data}
        />
        <IconButton
          aria-label="theme switcher"
          icon={<AiOutlineSwap />}
          rounded="full"
          width={"fit-content"}
          my={4}
          onClick={() => {
            setData({ ...data, origin: data.destination, destination: data.origin });
          }}
        />
        <AirportSelect
          label={"Destination"}
          onChange={(e) => {
            setData({
              ...data,
              destination: e.value,
            });
          }}
          data={data}
        />
      </Flex>
      <Flex w={"full"} justify={"space-between"} flexDir={["column", null, "row"]} align={"center"}>
        <Input
          placeholder="Departure Date"
          type="date"
          w={["full", null, "300px"]}
          my={4}
          onChange={(e) => {
            setData({ ...data, departureDate: e.target.value });
          }}
          value={data.departureDate ? data.departureDate : ""}
          variant={"filled"}
          bgColor={useColorModeValue("gray.200", "gray.700")}
        />
        <Input
          placeholder="Seats"
          type="number"
          w={["full", null, "300px"]}
          my={4}
          onChange={(e) => {
            setData({ ...data, seats: e.target.value });
          }}
          value={data.seats ? data.seats : ""}
          variant={"filled"}
          bgColor={useColorModeValue("gray.200", "gray.700")}
        />
      </Flex>
      <Button
        w={"full"}
        my={4}
        variant={"solid"}
        colorScheme={"blue"}
        onClick={async () => {
          try {
            await addFlight(data);
            toast({
              title: "Flight Added",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } catch (error) {
            toast({
              title: error.response.data.error,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            console.log(error)
          }
      
        }}
      >
        Add Flight
      </Button>
    </Box>
  );
};
