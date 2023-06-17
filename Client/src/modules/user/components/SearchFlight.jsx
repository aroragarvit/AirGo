import { useColorModeValue } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { AiOutlineSwap } from "react-icons/ai";
import { AirportSelect } from "../../../common/AirportSelect";
import { Flex, Box, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import {useToast} from "@chakra-ui/react"
import {search} from "../services/search"

export const SearchFlight = ({setData: setResultsData}) => {
  const [data, setData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    seats: 1,
  });

  const { isAuthenticated, manageAuthModal } = useContext(AuthContext);
  const toast = useToast()

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} p={[4, null, 8]} w={["full", null, "3xl", "4xl"]} rounded="2xl">
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
          value={data.departureDate}
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
          value={data.seats}
          variant={"filled"}
          bgColor={useColorModeValue("gray.200", "gray.700")}
        />
      </Flex>

      <Button
        w={"full"}
        my={4}
        variant={"solid"}
        colorScheme={"blue"}
        onClick={() => {
          if(!isAuthenticated) {
            manageAuthModal.onOpen()
            toast({
              title: "You need to be logged in to search for flights",
              status: "error",
              duration: 5000,
              isClosable: true,
            })
            return;
          }
          console.log(data)
          search(data).then(
            (resData) => {console.log(resData)
            setResultsData(resData.flights)
            }
          ).catch(
            (e) => toast({
              title: "Error",
              description: "No flights found",
              status: "error",
              duration: 5000,
              isClosable: true,
            })
          )
          
        }}
      >
        Search
      </Button>
    </Box>
  );
};
