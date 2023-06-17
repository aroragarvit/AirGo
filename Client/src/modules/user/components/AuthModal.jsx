import {
  Modal,
  Button,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalBody,
  Text,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { useState } from "react";
import { login } from "../services/login.js";
import { signin } from "../services/signin";

export const AuthModal = ({ authType }) => {
  const toast = useToast();
  const { setUser, setIsAuthenticated, manageAuthModal } = useContext(AuthContext);
  const [authUser, setAuthUser] = useState({});

  return (
    <Modal isOpen={manageAuthModal.isOpen} onClose={manageAuthModal.onClose} isCentered size={["sm", null, "lg", "xl"]}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>{authType ? authType : "Login"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4} fontSize={"xl"}>
            Welcome to AirGo!
          </Text>
          {authType === "Sign Up" && (
            <Input
              type="text"
              placeholder="Enter a Username"
              mb={4}
              size={"lg"}
              onChange={(e) => {
                setAuthUser({
                  ...authUser,
                  username: e.target.value,
                });
              }}
            />
          )}
          <Input
            type="email"
            placeholder="Enter your Email"
            mb={4}
            size={"lg"}
            onChange={(e) => {
              setAuthUser({
                ...authUser,
                email: e.target.value,
              });
            }}
          />
          <Input
            type="password"
            placeholder="Enter Your Password"
            size={"lg"}
            onChange={(e) => {
              setAuthUser({
                ...authUser,
                password: e.target.value,
              });
            }}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            variant="solid"
            colorScheme="blue"
            width={"full"}
            size={"lg"}
            onClick={async () => {
              if (authType === "Sign Up" && !authUser.username) {
                toast({
                  title: "Enter a Username",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
                return;
              }
              if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(authUser.email)) {
                toast({
                  title: "Enter a valid Email",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
                return;
              }
              if (!authUser.password) {
                toast({
                  title: "Enter a Password",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
                return;
              }
              if (authType === "Login") {
                try {
                  const data = await login(authUser.email, authUser.password);
                  setIsAuthenticated(true);
                  setUser({
                    email: authUser.email,
                  });
                  localStorage.setItem("token", data.token);
                } catch (error) {
                  toast({
                    title: error.response.data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              } else {
                try {
                  await signin(authUser.username, authUser.email, authUser.password);
                  toast({
                    title: "Please verify your email to login",
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
                }
              }
              manageAuthModal.onClose();
            }}
          >
            {authType}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
