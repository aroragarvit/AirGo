import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { AdminLogin } from "../modules/admin/components/AdminLogin";
import { Navbar } from "../modules/admin/components/Navbar";
import { AddFlight } from "../modules/admin/components/AddFlight";
import { ViewFlights } from "../modules/admin/components/ViewFlights";
import { Input, Button } from "@chakra-ui/react";

export const AdminDashboard = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [data, setData] = useState(null);
  return (
    <Box h={"100vh"} w={"100vw"} overflowX={"hidden"}>
      <Navbar />
      <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto" px={8} py={16} height={"82vh"}>
        {isAdminAuthenticated ? (
          <>
            <AddFlight />
            <Flex justify={"center"} align={"center"} w={["full", null, "3xl", "4xl"]}>
              <Input placeholder="Search By Fight ID or Name" type="number" w={"full"} my={8} />
              <Button
                colorScheme={"blue"}
                ml={8}
                onClick={() => {
                  setData([
                    {
                      origin: "JDH",
                      departureTime: "16:55",
                      destination: "DEL",
                      arrivalTime: "18:55",
                      cost: 4521,
                      id: "6E612",
                      availableSeats: 12,
                    },
                  ]);
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
