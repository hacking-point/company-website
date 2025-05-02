import React, { useState } from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Stack,
  Flex,
  Heading,
  Divider,
  VStack,
  Input,
  Collapse,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const ProductDetail = ({ product }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      maxW="1200px"
      mx="auto"
      p={5}
      bg="white"
      borderRadius="lg"
      boxShadow="0 10px 30px rgba(0, 0, 0, 0.2)"
    >
      <Box
        maxW={{ base: '100%', md: '50%' }}
        position="relative"
        overflow="hidden"
        borderRadius="md"
        boxShadow="0 10px 20px rgba(0, 0, 0, 0.2)"
        _hover={{
          transform: "scale(1.05)",
          transition: "transform 0.3s",
        }}
      >
        <Image src={selectedImage} alt={product.name} borderRadius="md" />
      </Box>

      <Box ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }} flex="1">
        <Heading fontSize="2xl">{product.name}</Heading>
        <Text fontSize="lg" color="gray.600" mt={2}>
          {product.description}
        </Text>
        <Text fontSize="xl" color="teal.500" mt={4}>
          ${product.price}
        </Text>

        <VStack spacing={4} align="start" mt={4}>
          <Divider />
          <Heading size="md">Specifications</Heading>
          <Text>{product.specifications}</Text>
          <Divider />
          <Heading size="md">Rating</Heading>
          <Flex align="center">
            <Text fontSize="lg" mr={2}>
              {product.rating}
            </Text>
            <StarIcon color="teal.500" />
          </Flex>
        </VStack>

        <Button
          colorScheme="teal"
          size="lg"
          mt={4}
          onClick={() => setShowComments((prev) => !prev)}
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </Button>

        <Collapse in={showComments}>
          <Box mt={4}>
            <Text fontSize="lg">Comments:</Text>
            {comments.length === 0 ? (
              <Text>No comments yet.</Text>
            ) : (
              comments.map((comment, index) => (
                <Text key={index} mt={2} borderBottom="1px" borderColor="gray.200">
                  {comment}
                </Text>
              ))
            )}
            <Input
              mt={4}
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              mt={2}
              colorScheme="teal"
              onClick={handleCommentSubmit}
              isDisabled={!newComment.trim()}
            >
              Submit
            </Button>
          </Box>
        </Collapse>
      </Box>

      <Box mt={4}>
        <Heading size="md">More Images</Heading>
        <Flex mt={2}>
          {product.images.map((image, index) => (
            <Box
              key={index}
              w="60px"
              h="60px"
              borderRadius="md"
              overflow="hidden"
              mr={2}
              onClick={() => setSelectedImage(image)}
              cursor="pointer"
              boxShadow="0 2px 5px rgba(0, 0, 0, 0.2)"
              _hover={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)" }}
            >
              <Image src={image} alt={`Product image ${index + 1}`} objectFit="cover" />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const ProductShowcase = () => {
  const product = {
    name: '3D Product Example',
    description: 'This is a detailed view of the product. It has many features and benefits that you will love.',
    price: '49.99',
    specifications: 'Feature 1, Feature 2, Feature 3',
    rating: 4, // Assuming a rating out of 5
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300/FF0000',
      'https://via.placeholder.com/300/00FF00',
      'https://via.placeholder.com/300/0000FF',
    ],
  };

  return <ProductDetail product={product} />;
};

export default ProductShowcase;