import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { AdminLogin } from "../modules/admin/components/AdminLogin";
import { Navbar } from "../modules/admin/components/Navbar";
import { AddFlight } from "../modules/admin/components/AddFlight";
import { ViewFlights } from "../modules/admin/components/ViewFlights";
import { Input, Button } from "@chakra-ui/react";
import { searchFlight } from "../modules/admin/services/searchFlight";

export const AdminDashboard = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [data, setData] = useState(null);
  const [flightId, setFlightId] = useState(null);
  return (
    <Box h={"100vh"} w={"100vw"} overflowX={"hidden"}>
      <Navbar />
      <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto" px={8} py={16} height={"82vh"}>
        {isAdminAuthenticated ? (
          <>
            <AddFlight />
            <Flex justify={"center"} align={"center"} w={["full", null, "3xl", "4xl"]}>
              <Input
                placeholder="Search By Fight ID or Name"
                type="text"
                w={"full"}
                my={8}
                onChange={(e) => {
                  setFlightId(e.target.value);
                }}
              />
              <Button
                colorScheme={"blue"}
                ml={8}
                onClick={() => {
                  searchFlight({ flightId })
                    .then((res) => {
                      setData(res.flight);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Search
              </Button>
            </Flex>
            <ViewFlights data={data} setData={setData} />
          </>
        ) : (
          <AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />
        )}
      </Flex>
    </Box>
  );
};
