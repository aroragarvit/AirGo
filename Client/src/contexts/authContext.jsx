import React, { useEffect, createContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import jsCookie from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const tokenCookie = jsCookie.get("token");
      setToken(tokenCookie);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/onboard", { withCredentials: true })
        .then((response) => {
          if (response.status === 200) {
            setIsAuthenticated(true);
            setUser(response.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  const manageAuthModal = {
    isOpen,
    onOpen,
    onClose,
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, manageAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};
