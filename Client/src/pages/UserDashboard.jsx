import { Navbar } from "../modules/user/components/Navbar";
import { Flex, Box } from "@chakra-ui/react";
import { SearchFlight } from "../modules/user/components/SearchFlight";
import { useState } from "react";
import { ViewFlights } from "../modules/user/components/ViewFlights";

export const UserDashboard = () => {
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  return (
    <Box h={"100vh"} w={"100vw"} overflowX={"hidden"}>
      <Navbar />
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: "1200px" }}
        m="0 auto"
        px={8}
        py={16}
        height={"82vh"}
      >
        <SearchFlight setData={setData} setUserData={setUserData} />
        <ViewFlights data={data} userData={userData} />
      </Flex>
    </Box>
  );
}