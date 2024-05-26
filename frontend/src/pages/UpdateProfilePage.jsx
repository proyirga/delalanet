import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import usePreviewImage from '../hooks/usePreviewImage';

export default function UpdateProfilePage() {
    const [user, setUser] = useRecoilState(userAtom)
    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        bio: user.bio,
        email: user.email,
        password: "",
    });
    const fileRef = useRef(null);

    const {handleImageChange, imageUrl} = usePreviewImage();
    return (
        <Flex
            align={'center'}
            justify={'center'}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    Update profile
                </Heading>
                <FormControl id="userName">
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size="xl" src={imageUrl || user.profilepic} boxShadow={"md"}/>
                        </Center>
                        <Center w="full">
                            <Button w="full" onClick={()=> fileRef.current.click()}>Change pictue</Button>
                            <Input type='file' hidden ref={fileRef} onChange={handleImageChange}/>
                        </Center>
                    </Stack>
                </FormControl>
                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        placeholder="Your name"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                        value={inputs.name}
                    />
                </FormControl>
                <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                        placeholder="Username"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        value={inputs.username}
                    />
                </FormControl>
                <FormControl id="bio" isRequired>
                    <FormLabel>Bio</FormLabel>
                    <Input
                        placeholder="About you"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                        value={inputs.bio}
                    />
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        value={inputs.email}
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        placeholder="password"
                        _placeholder={{ color: 'gray.500' }}
                        type="password"
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        value={inputs.password}
                    />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        bg={'red.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red.500',
                        }}>
                        Cancel
                    </Button>
                    <Button
                        bg={'green.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'green.500',
                        }}>
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}