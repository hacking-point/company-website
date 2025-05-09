import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useReducer, useState } from "react";
import { ThreeDBotton, ThreeDInput } from "../components/Button";
import ResetPassword from "../components/ResetPassword";
import Otp from "../components/Otp";

const initState={
  email:""
}
const reducer=(store,{type,payload})=>{
  switch(type){
    case "email":
      return {...store,email:payload}
    default:
      return {...store}
  }

}
const ForgotPassword = () => {
  const [text,setText]=useReducer(reducer,initState)
  const handleSubmit=()=>{
    console.log(text)
  }
  return (
    <Flex minH={"100vh"} justifyContent={"center"} align={"center"}>
      <Box bg={useColorModeValue("gray.200", "gray.500")}>
        <Stack>
          <Stack textAlign={"center"}>
            <Heading>Forgot Your Password</Heading>
            <Text>You'll get an email with a reset Otp</Text>
          </Stack>
          <Stack
            spacing={4}
            bg={useColorModeValue("gray.300", "white.100")}
            rounded={"xl"}
            boxShadow={"lg"}
            px={4}
            py={4}
          >
            <FormControl>
              <FormLabel>Forgot Password</FormLabel>
              <Input type="email" onChange={(e)=>setText({type:"email",payload:e.target.value})}/>
            </FormControl>

            <Button
              bg={"blue.500"}
              color={"white"}
              _hover={{
                bg: "blue.300",
              }}
              onClick={handleSubmit}
            >
              Request Reset
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default ForgotPassword;
