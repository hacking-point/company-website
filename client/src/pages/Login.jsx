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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa"

export const Login = () => {
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
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
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
            <HStack justify={'center'} align={'center'} spacing={4}>
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
