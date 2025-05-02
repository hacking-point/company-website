import React from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Heading
  
  
} from '@chakra-ui/react';

const ProductCard = ({ image, title, description }) => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="0 10px 20px rgba(0, 0, 0, 0.1)"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      }}
      p={4}
      textAlign="center"
    >
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="md"
        _hover={{
          transform: 'scale(1.05)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        }}
        transition="transform 0.3s, box-shadow 0.3s"
      >
        <Image src={image} alt={title} boxSize="200px" objectFit="cover" />
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.2)"
          borderRadius="md"
          transition="opacity 0.3s"
          _hover={{ opacity: 0 }}
        />
      </Box>
      <Heading size="md" mt={4} mb={2}>{title}</Heading>
      <Text>{description}</Text>
      <Button
        mt={4}
        borderRadius="full"
        bgGradient="linear(to-r, teal.400, teal.600)"
        color="white"
        boxShadow="0 10px 20px rgba(0, 0, 0, 0.2)"
        transition="all 0.3s"
        _hover={{
          transform: 'translateY(-3px)',
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
        }}
        _active={{
          transform: 'translateY(1px)',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        Add to Cart
      </Button>
    </Box>
  );
};


export default ProductCard