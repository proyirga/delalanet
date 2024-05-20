import { PhoneIcon } from "@chakra-ui/icons"
import { Avatar, Box, Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from "@chakra-ui/react"
import { CgMoreO } from "react-icons/cg"
import { Link } from "react-router-dom"
const UserHeader = () => {
    const toast = useToast()
    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title: 'Profile Link.',
                description: "Profile link copied.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        });
    };
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Flex>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>Nilay Patel</Text>
                        <Image src="verified.png" w={4} h={4} mt={3} />
                    </Flex>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>Delala</Text>
                        <PhoneIcon mt={2} borderRadius={"full"} />
                    </Flex>
                </Box>
                <Box>
                    <Avatar name="Nilay Patel" src="https://bit.ly/ryan-florence" size={
                        {
                            base: "md",
                            md: "xl"
                        }
                    } />
                </Box>
            </Flex>
            <Text>Delala, Specializing in automobiles sales and rents</Text>
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>3.2k successful sales</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>⭐⭐⭐⭐⭐</Link>
                </Flex>
                <Flex>
                    <Box className="icon-container">
                       <Button mr={3}>Follow</Button>
                    </Box>
                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Active lists (3)</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} pb={3} cursor={"pointer"} color={"gray.light"}>
                    <Text fontWeight={"bold"}>Sold(20)</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} pb={3} cursor={"pointer"} color={"gray.light"}>
                    <Text fontWeight={"bold"}>Archived(1)</Text>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserHeader