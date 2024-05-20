import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Link } from "react-router-dom"
import Actions from "./Actions"
import { useState } from "react"

const UserPost = ({postImg, postTitle, likes, price}) => {
  const [liked, setLiked] = useState(false)
  return (
    <Link to={"/reckless1280/post/1"}>
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
                
            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
                <Flex justifyContent={"space-between"} w={"full"}>
                  <Flex w={"full"} alignItems={"center"}>
                    
                    <Text fontSize={"small"} fontWeight={"bold"}>Nilay Patel</Text>
                    <Image src="/verified.png" w={4} h={4} ml={1}/>
                  </Flex>
                  <Flex gap={4} alignItems={"center"}>
                    <Text fontStyle={"sm"} color={'gray.light'}>1d</Text>
                    <BsThreeDots/>
                  </Flex>
                </Flex>
                <Text fontSize={"sm"}>{postTitle}</Text>
                {postImg && (
                <Box
                borderRadius={6}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"gray.light"}
                >
                    <Image src={postImg} w={"full"}/>
                </Box>
                )}
                <Flex gap={3} my={1}>
                    <Actions liked={liked} setLiked={setLiked}/>
                </Flex>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontWeight={"bold"}>Price : ETB {price}</Text>
                    <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                    <Text color={"gray.light"} fontSize={"sm"} >{likes + (liked ? 1 : 0)} clients liked this.</Text>
                </Flex>
            </Flex>
        </Flex>
    </Link>
  )
}

export default UserPost