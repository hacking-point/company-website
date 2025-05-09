import React from 'react';
import {
  Flex,
  Heading,
  Stack,
  PinInput,
  PinInputField,
  HStack,
} from '@chakra-ui/react';

const Otp = () => {
  return (
    <Flex  align="center" justify="center" bg="gray.50" px={4}>
      <Stack spacing={6} p={8} bg="white" boxShadow="lg" borderRadius="md">
        <Heading size="md" textAlign="center">
          Enter Your OTP
        </Heading>
        <HStack justify="center">
          <PinInput otp>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      </Stack>
    </Flex>
  );
};

export default Otp;
