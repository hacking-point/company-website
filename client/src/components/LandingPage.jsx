import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Image,
  Flex,
  Stack,
} from '@chakra-ui/react';
import ProductCard from './ProductCard';
import AnimatedSearchInput from './AnimatedInput';

const LandingPage = () => {
  const productImages = [
    'https://via.placeholder.com/300/FF5733/FFFFFF?text=Product+1',
    'https://via.placeholder.com/300/33FF57/FFFFFF?text=Product+2',
    'https://via.placeholder.com/300/3357FF/FFFFFF?text=Product+3',
  ];

  return (
    <Box
      minH="100vh"
      position="relative"
      backgroundImage="url('https://via.placeholder.com/1920x1080/FF5733/FFFFFF?text=Background+Image')"
      backgroundSize="cover"
      backgroundPosition="center"
      bgAttachment="fixed"
    >
      {/* Hero Section */}
      <Box
        color="white"
        py={20}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="hsla(0, 0%, 0%, 0.6)"
        flexDirection="column"
      >
        <Container maxW="container.md" textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Discover Amazing Products
          </Heading>
          <Text fontSize="xl" mb={6}>
            Shop the latest trends at unbeatable prices!
          </Text>
          
          {/* Animated Search Input */}
          <Stack  justify={'center'} align={'center'}>
          <AnimatedSearchInput />

          </Stack>

          

          <Button
            size="lg"
            borderRadius="full"
            bgGradient="linear(to-r, teal.400, teal.600)"
            color="white"
            boxShadow="0 20px 40px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)"
            transition="all 0.3s"
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 15px 30px rgba(0, 0, 0, 0.3)',
            }}
            _active={{
              transform: 'translateY(2px)',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
            }}
            mt={4}
          >
            Start Shopping
          </Button>
        </Container>
      </Box>

      {/* Product Cards Section */}
      <Container maxW="container.md" py={20}>
        <Heading as="h2" size="xl" mb={10} textAlign="center">
          Featured Products
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {productImages.map((image, index) => (
            <ProductCard
              key={index}
              image={image}
              title={`Product ${index + 1}`}
              description="This is a short description of the product."
            />
          ))}
        </SimpleGrid>
      </Container>

      {/* Upcoming Products Section */}
      <Box py={20} bg="gray.200" textAlign="center">
        <Container maxW="container.md">
          <Heading as="h3" size="lg" mb={4}>
            Upcoming Products
          </Heading>
          <Text mb={6}>
            Stay tuned for our latest arrivals!
          </Text>
          <SimpleGrid columns={[1, 2]} spacing={10}>
            {productImages.map((image, index) => (
              <ProductCard
                key={index}
                image={image}
                title={`Upcoming Product ${index + 1}`}
                description="This product will be available soon."
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Footer */}
      <Box py={10} bg="gray.300">
        <Container maxW="container.md" textAlign="center">
          <Text>© 2024 E-Commerce Store. All rights reserved.</Text>
          <Button
            size="md"
            borderRadius="full"
            bgGradient="linear(to-r, red.400, red.600)"
            color="white"
            boxShadow="0 20px 40px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)"
            transition="all 0.3s"
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 15px 30px rgba(0, 0, 0, 0.3)',
            }}
            _active={{
              transform: 'translateY(2px)',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
            }}
            mt={4}
          >
            View Cart
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;