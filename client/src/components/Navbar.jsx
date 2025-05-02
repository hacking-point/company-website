import React from "react";
import {
  Box,
  Flex,
  Image,
  Input,
  Button,
  Icon,
  useBreakpointValue,
  VStack,
  HStack,
  Collapse,
  IconButton,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Center,
  Stack,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import { MdShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import logo from "../logo.png"

const Links = ["Dashboard", "Projects", "Team"];


const NavLink = ({ children }) => (
  <Box
    as="a"
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Box>
);

const NavBar = () => {
  const searchInputSize = useBreakpointValue({ base: "sm", md: "md" });
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      bg="white"
      shadow="lg"
      borderBottomWidth="1px"
      borderColor="gray.200"
      py={4}
      position="sticky"
      top={0}
      zIndex={1}
    >
      <HStack maxW={{base:"1200px",md:"1500px","lg":"1900px"}} ml={4} px={2} spacing={4} justify="space-between" align="center">
        <Image
          src={logo}
          alt="Logo"
          boxSize="50px"
          objectFit="contain"
          borderRadius="md"
          boxShadow="0 5px 15px rgba(0, 0, 0, 0.2)"
          transition="all 0.3s"
          _hover={{
            transform: "scale(2.05)",
          }}
        />

        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>

        <Input
          placeholder="Search products..."
          size={searchInputSize}
          variant="outline"
          borderColor="gray.300"
          borderRadius="md"
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
          transition="all 0.3s"
          _focus={{
            borderColor: "teal.500",
            boxShadow: "0 0 0 1px teal.500",
            transform: "translateY(-2px)",
          }}
        />

        {/* Hamburger Menu Icon */}
        <IconButton
          icon={isOpen ? <MdClose size={'lg'} /> : <MdMenu size={'lg'} />}
          aria-label="Toggle Menu"
          variant="outline"
          onClick={onToggle}
          display={{ base: "block", md: "none" }}
          size={'sm'}
          ml={2}
        />

        {/* Nav Buttons for Desktop */}
        <HStack ml={4} width={'xl'} px={4} spacing={2} display={{ base: "none", md: "flex" }} justify={'space-around'}>
          <Button
            variant="solid"
            colorScheme="teal"
            size="sm"
            borderRadius="md"
            boxShadow="0 5px 15px rgba(0, 0, 0, 0.2)"
            transition="all 0.3s"
            _hover={{
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
              transform: "translateY(-3px)",
            }}
          >
            Login
          </Button>

          <Icon
            as={MdShoppingCart}
            boxSize="6"
            cursor="pointer"
            transition="transform 0.3s"
            _hover={{ transform: "scale(1.1)" }}
            borderRadius="md"
            boxShadow="0 4px 10px rgba(0, 0, 0, 0.2)"
          />

          {/* Color Mode Button */}
          <Button onClick={toggleColorMode} variant="ghost">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>

          {/* User Menu */}
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={"https://avatars.dicebear.com/api/male/username.svg"}
              />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <br />
              <Center>
                <Avatar
                  size={"2xl"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </Center>
              <br />
              <Center>
                <Text>Username</Text>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Your Servers</MenuItem>
              <MenuItem>Account Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>

      {/* Mobile Menu */}
      <Collapse in={isOpen}>
        <VStack
          spacing={4}
          align="stretch"
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="md"
          display={{ md: "none" }}
        >
          <HStack spacing={4} justify={'space-around'}>
            <Icon
              as={MdShoppingCart}
              boxSize="6"
              cursor="pointer"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.1)" }}
              borderRadius="md"
              boxShadow="0 4px 10px rgba(0, 0, 0, 0.2)"
            />
            <Button
              variant="solid"
              colorScheme="teal"
              size="sm"
              borderRadius="md"
              boxShadow="0 5px 15px rgba(0, 0, 0, 0.2)"
              transition="all 0.3s"
              _hover={{
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
                transform: "translateY(-3px)",
              }}
            >
              Login
            </Button>
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Stack>
            </Flex>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </Center>
                <br />
                <Center>
                  <Text>Username</Text>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </VStack>
      </Collapse>
    </Box>
  );
};

export default NavBar;