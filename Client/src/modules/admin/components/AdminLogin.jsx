import { Button, Text, Input, useToast, Box } from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../services/login";
import Cookies from "js-cookie";

export const AdminLogin = ({ setIsAdminAuthenticated }) => {
  const toast = useToast();
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });

  return (
    <Box>
      <Text mb={4} fontSize={"xl"}>
        Admin Access
      </Text>
      <Input
        type="email"
        placeholder="Enter your Email"
        mb={4}
        size={"lg"}
        onChange={(e) => {
          setAdminCredentials({
            ...adminCredentials,
            email: e.target.value,
          });
        }}
      />
      <Input
        type="password"
        placeholder="Enter Your Password"
        size={"lg"}
        onChange={(e) => {
          setAdminCredentials({
            ...adminCredentials,
            password: e.target.value,
          });
        }}
        mb={8}
      />
      <Button
        variant="solid"
        colorScheme="blue"
        width={"full"}
        size={"lg"}
        onClick={async () => {
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(adminCredentials.email)) {
            toast({
              title: "Enter a valid Email",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return;
          }
          if (!adminCredentials.password) {
            toast({
              title: "Enter a Password",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return;
          }
          try {
            const data = await login(adminCredentials.email, adminCredentials.password);
            Cookies.set("token", data.token);
            setIsAdminAuthenticated(true);
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
        Login
      </Button>
    </Box>
  );
};
