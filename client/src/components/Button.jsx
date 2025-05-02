import React, { useState } from 'react';
import { Button, Box, Input } from '@chakra-ui/react';

export const ThreeDBotton = ({value,onClick}) => {
   
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button
        position="relative"
        backgroundColor="#4A5568"
        color="white"
        padding="20px 40px"
        borderRadius="8px"
        boxShadow="0 5px 15px rgba(0, 0, 0, 0.3)"
        transition="all 0.3s"
        _hover={{
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
          transform: "translateY(-5px)",
        }}
        _active={{
          boxShadow: "0 3px 7px rgba(0, 0, 0, 0.2)",
          transform: "translateY(2px)",
        }} onClick={(val)=>onClick(val)}
      >
        {value}
      </Button>
    </Box>
  );
};

// 3D Input Component
export const ThreeDInput = () => {
    const [text,setText]=useState("")
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Input
        placeholder="Enter text..."
        size="lg"
        borderRadius="8px"
        backgroundColor="white"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
        transition="all 0.3s"
        _focus={{
          boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.6)",
          transform: "translateY(-2px)",
        }}
        _hover={{
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
        }}
        _active={{
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          transform: "translateY(2px)",
        }}
        padding="20px"
        onChange={(e)=>setText(e.target.value)}
      />
    </Box>
  );
};