import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  Button,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionInput = motion(Input);

const AnimatedSearchInput = ({ typingSpeed = 150, deletingSpeed = 100 }) => {
  const searchInputSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const fullText = 'Welcome To Roger N Reckon';
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTyping) {
        if (index < fullText.length) {
          setText(fullText.slice(0, index + 1));
          setIndex((prev) => prev + 1);
        } else {
          setIsTyping(false); 
        }
      } else {
        if (index > 0) {
          setText(fullText.slice(0, index - 1));
          setIndex((prev) => prev - 1);
        } else {
          setIsTyping(true); 
          setIndex(0); 
        }
      }
    }, isTyping ? typingSpeed : deletingSpeed);

    return () => clearInterval(interval); 
  }, [isTyping, index, fullText, typingSpeed, deletingSpeed]);

  return (
    <Flex alignItems="center" ml={6}>
      <Box>
        <MotionInput
          aria-label="Search products"
          placeholder="Search products..."
          size={searchInputSize}
          textAlign={'center'}
          value={text}
          variant="outline"
          borderColor="gray.300"
          borderRadius="xl"
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
          transition="all 0.3s"
          readOnly 
          _focus={{
            borderColor: 'teal.500',
            boxShadow: '0 0 0 1px teal.500',
          }}
          initial={{ scale: 1 }}
          animate={{ scale: isTyping ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          width={{ base: '200px', md: '500px' }} 
          height="45px" 
        />
      </Box>
    </Flex>
  );
};

export default AnimatedSearchInput;