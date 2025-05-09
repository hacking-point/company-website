"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  chakra,
  HStack,
  Icon,
  Tooltip,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useEffect, useReducer, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";

const initState = {
  email: "",
  password: "",
};
const reducer = (store, { type, payload }) => {
  switch (type) {
    case "email":
      return { ...store, email: payload };
    case "password":
      return { ...store, password: payload };

    default:
      return { ...store };
  }
};
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [text, setText] = useReducer(reducer, initState);
  const [localError, setLocalError] = useState(null);
  const [localSuccess, setLocalSuccess] = useState(null);
  const { isLoading, isError,data } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    console.log(text);
  };
  useEffect(() => {
    if (isError) {
      setLocalError(isError);

      const timer = setTimeout(() => setLocalError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);
  useEffect(()=>{
     if(data){
        setLocalSuccess()
        const timer=setTimeout(()=>setLocalSuccess(null),100)
        return ()=>clearTimeout(timer)
     }

  },[data])
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={4} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Text color={"blue.400"}>features</Text> ✌️
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
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
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
                  onChange={(e) =>
                    setText({ type: "password", payload: e.target.value })
                  }
                />
                <InputRightElement
                  cursor={"pointer"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link to={"/auth/forgotpassword"}>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
            <Stack>
              <Text>
                Didn't Have A account? Click here:{" "}
                <Link to="/auth/register">
                  <chakra.span color="blue.400" fontWeight="bold">
                    SignUp
                  </chakra.span>
                </Link>
              </Text>
            </Stack>
            <HStack justify={"center"} align={"center"} spacing={4}>
              <Tooltip label="Login with Gmail " hasArrow placement="top">
                <Icon
                  as={FcGoogle}
                  boxSize="10"
                  cursor="pointer"
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.1)" }}
                  borderRadius="md"
                  boxShadow="0 4px 10px rgba(0, 0, 0, 0.2)"
                />
              </Tooltip>
              <Tooltip label="Login with github" hasArrow placement="top">
                <Icon
                  as={FaGithub}
                  boxSize="10"
                  cursor="pointer"
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.1)" }}
                  borderRadius="md"
                  boxShadow="0 4px 10px rgba(0, 0, 0, 0.2)"
                />
              </Tooltip>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
