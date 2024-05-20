import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Actions"
import { PhoneIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"

export const HomePage = () => {
  const [liked, setLiked] = useState(false)
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Box>
            <Avatar name="Nilay Patel" src="https://bit.ly/ryan-florence" size={
              {
                base: "md",
                md: "xl"
              }
            } />
          </Box>
          <Link to={"/username"}>
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
          </Link>

        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Flex>
        <Text my={3}>JETOUR X90
          Year: 2022 for sale</Text>
      </Flex>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Flex justifyContent={"start"} gap={3}>
          <Flex>
            <Image src="/car-1.jpg" w={"full"} />
          </Flex>
          <Flex justifyContent={"start"} gap={3}>
            <Image src="/car-1.jpg" w={"full"} />
          </Flex>
        </Flex>
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>2 replies</Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>{20 + (liked ? 1 : 0)} likes</Text>
      </Flex>
      <Divider my={2} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text>ETB</Text>
          <Text fontWeight={"bold"}>4,500,000</Text>
        </Flex>
        <Button>
          Interested?
        </Button>
      </Flex>
      <Divider my={2} />
    </>
  )
}
