import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Link, Text, HStack, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";
import useToastHook from "../hooks/useToastHook";
import { Button } from "@chakra-ui/react";
import { MdOutlineSettings } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoMdStar } from "react-icons/io";

const UserHeader = ({ user }) => {
	const showToast = useToastHook();
	const currentUser = useRecoilValue(userAtom);
	const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

	const copyURL = () => {
		const currentURL = window.location.href;
		navigator.clipboard.writeText(currentURL).then(() => {
			showToast("Success", "Link copied to clipboard.", "success");
		});
	};
	return (
		<VStack gap={4} alignItems={"start"}>
			<Flex justifyContent={"space-between"} w={"full"}>
				<Box>
					<Text fontSize={"2xl"} fontWeight={"bold"}>
						{user.name}
					</Text>
					<Flex gap={2} alignItems={"center"}>
						<Text fontSize={"sm"}>{user.location}</Text>
						<CiLocationOn size={25}/>
					</Flex>
				</Box>
				<Box>
					{user.profilePic && (
						<Avatar
							name={user.name}
							src={user.profilePic}
							size={{
								base: "md",
								md: "xl",
							}}
						/>
					)}
					{!user.profilePic && (
						<Avatar
							name={user.name}
							src='https://bit.ly/broken-link'
							size={{
								base: "md",
								md: "xl",
							}}
						/>
					)}
				</Box>
			</Flex>

			<Text>{user.bio}</Text>

			{currentUser?._id === user._id && (
				<Link as={RouterLink} to='/update'>
					<HStack>
					<Button size={"sm"}>Update Profile</Button>
					<Link as={RouterLink} to="/settings">
						<MdOutlineSettings size={20} />
					</Link>
					</HStack>
				</Link>
			)}
			{currentUser?._id !== user._id && (
				<Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
					{following ? "Unfollow" : "Follow"}
				</Button>
			)}
			<Flex w={"full"} justifyContent={"space-between"}>
				<Flex gap={2} alignItems={"center"}>
					
					<IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar />
					<Box w='1' h='1' bg={"gray.light"} borderRadius={"full"}></Box>
					<Link color={"green.light"}>See feedbacks given by your clients</Link>
				
				</Flex>
				<Flex>
					<Box className='icon-container'>
						<Menu>
							<MenuButton>
								<CgMoreO size={24} cursor={"pointer"} />
							</MenuButton>
							<Portal>
								<MenuList bg={"gray.dark"}>
									<MenuItem bg={"gray.dark"} onClick={copyURL}>
										Copy link
									</MenuItem>
								</MenuList>
							</Portal>
						</Menu>
					</Box>
				</Flex>
			</Flex>

			<Flex w={"full"}>
				<Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
					<Text fontWeight={"bold"}> Current Items</Text>
				</Flex>
				<Flex
					flex={1}
					borderBottom={"1px solid gray"}
					justifyContent={"center"}
					color={"gray.light"}
					pb={3}
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> Inactive Items</Text>
				</Flex>
			</Flex>
		</VStack>
	);
};

export default UserHeader;