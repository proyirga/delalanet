import {
	Box,
	Flex,
	Link,
	Button,
	useColorModeValue,
	Stack,
	useColorMode,
	Heading,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AiFillHome } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { Link as RouterLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { BsFillChatQuoteFill } from 'react-icons/bs';
import { MdOutlineSettings } from 'react-icons/md';
import userAtom from '../atoms/userAtom';
import authScreenAtom from '../atoms/authAtom';
import useLogout from '../hooks/useLogout';


export default function Header() {
	const { colorMode, toggleColorMode } = useColorMode();
	const user = useRecoilValue(userAtom);
	const logout = useLogout();
	const setAuthScreen = useSetRecoilState(authScreenAtom);

	return (
		<>
			<Box bg={useColorModeValue("gray.200", "#101010")} px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'} fontWeight={"bold"}>
					<Flex alignItems={'center'}>
						{user ? (
							<Link as={RouterLink} to="/">
								<AiFillHome size={"50"} />
							</Link>
						) : (
							<Link as={RouterLink} to="/auth" onClick={() => setAuthScreen('login')}>
								Login
							</Link>
						)}
					</Flex>

					<Heading>
						DelalaNet
					</Heading>

					<Button onClick={toggleColorMode}>
						{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
					</Button>

					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							{user ? (
								<>
									<Link as={RouterLink} to="/chat">
										<BsFillChatQuoteFill size={50} />
									</Link>
									<Menu>
										<MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'}>
											<Avatar size={'md'} src={user.profilePic} />
										</MenuButton>
										<MenuList>
											<MenuItem as={RouterLink} to={`/${user.username}`}>
												<RxAvatar size={20} /> Profile
											</MenuItem>
											<MenuItem as={RouterLink} to="/settings">
												<MdOutlineSettings size={20} /> Settings
											</MenuItem>
											<MenuDivider />
											<MenuItem onClick={logout}>
												<FiLogOut size={20} /> Logout
											</MenuItem>
										</MenuList>
									</Menu>
								</>
							) : (
								<Link as={RouterLink} to="/auth" onClick={() => setAuthScreen('signup')}>
									Sign up
								</Link>
							)}
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}