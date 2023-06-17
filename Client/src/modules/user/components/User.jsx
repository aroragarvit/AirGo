import { Avatar, Box, Button, Menu, MenuButton, MenuList, Text, MenuItem } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { AuthModal } from "./AuthModal";
import { useState } from "react";

export const User = () => {
  const { user, isAuthenticated, setIsAuthenticated, manageAuthModal } = useContext(AuthContext);
  const [authType, setAuthType] = useState("Login");
  return (
    <>
      <AuthModal authType={authType}/>
      <Menu>
        <MenuButton as={Button} rounded={"full"} cursor={"pointer"} padding={0}>
          <Avatar size={"sm"} src={isAuthenticated && "https://avatars.dicebear.com/api/male/username.svg"} />
        </MenuButton>
        <MenuList paddingX={2} paddingY={4}>
          {!isAuthenticated && (
            <Box>
              <MenuItem
                onClick={() => {
                  setAuthType("Sign Up");
                  manageAuthModal.onOpen();
                }}
              >
                <Text cursor={"pointer"}>SignUp</Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAuthType("Login");
                  manageAuthModal.onOpen();
                }}
              >
                <Text cursor={"pointer"}>Login</Text>
              </MenuItem>
            </Box>
          )}
          {isAuthenticated && (
            <Box>
              <Text marginBottom={5}>{user.email}</Text>
              <Text cursor={"pointer"} mb={"4"}>
                My Trips
              </Text>
              <Text
                cursor={"pointer"}
                onClick={() => {
                  setIsAuthenticated(false);
                }}
              >
                Log Out
              </Text>
            </Box>
          )}
        </MenuList>
      </Menu>
    </>
  );
};
