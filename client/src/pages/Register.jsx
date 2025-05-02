"use client";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  chakra,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postRegisterData } from "../redux/auth/action";

const initState = {
  username: "",
  email: "",
  password: "",
};

const reducer = (store, { type, payload }) => {
  switch (type) {
    case "email":
      return { ...store, email: payload };
    case "username":
      return { ...store, username: payload };
    case "password":
      return { ...store, password: payload };
    default:
      return store;
  }
};

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [text, setText] = useReducer(reducer, initState);
  const { isLoading, data, isError } = useSelector((store) => store.auth);

  const [localError, setLocalError] = useState(null);
  const [localSuccess, setLocalSuccess] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!text.username || !text.email || !text.password) {
      setLocalError("Please fill all fields");
      return;
    }
    dispatch(postRegisterData(text));
  };

  useEffect(() => {
    if (isError) {
      setLocalError(isError);
      const timer = setTimeout(() => setLocalError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  useEffect(() => {
    if (data.username) {
      setLocalSuccess(`${data.username},Your Registration successful!`);
      setText({ type: "username", payload: "" });
      setText({ type: "email", payload: "" });
      setText({ type: "password", payload: "" });

      const timer = setTimeout(() => {
        setLocalSuccess(null);
        navigate("/auth/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [data.username]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign Up to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool{" "}
            <chakra.span color={"blue.400"}>features</chakra.span> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {localError && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {typeof localError === "string"
                  ? localError
                  : "Something went wrong"}
              </Alert>
            )}

            {localSuccess && (
              <Alert status="success" borderRadius="md">
                <AlertIcon />
                {localSuccess}
              </Alert>
            )}

            <FormControl id="username">
              <FormLabel>User Name</FormLabel>
              <Input
                type="text"
                value={text.username}
                onChange={(e) =>
                  setText({ type: "username", payload: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={text.email}
                onChange={(e) =>
                  setText({ type: "email", payload: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={text.password}
                  onChange={(e) =>
                    setText({ type: "password", payload: e.target.value })
                  }
                />
                <InputRightElement
                  onClick={() => setShowPassword(!showPassword)}
                  cursor="pointer"
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10}>
              <Button
                loadingText="Signing Up...."
                bg={"blue.400"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </Stack>

            <Stack>
              <Text>
                Already have an account?{" "}
                <Link to="/auth/login">
                  <chakra.span color="blue.400" fontWeight="bold">
                    Login
                  </chakra.span>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
