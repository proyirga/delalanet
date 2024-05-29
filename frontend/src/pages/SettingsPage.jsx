import { Button, Container, Text } from "@chakra-ui/react";
import useLogout from "../hooks/useLogout";
import useToastHook from "../hooks/useToastHook";

export const SettingsPage = () => {
	const showToast = useToastHook();
	const logout = useLogout();

	const freezeAccount = async () => {
		if (!window.confirm("Are you sure you want to deactivate your account?")) return;

		try {
			const res = await fetch("/api/users/freeze", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (data.error) {
				return showToast("Error", data.error, "error");
			}
			if (data.success) {
				await logout();
				showToast("Success", "Your account has been deactivated", "success");
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<Container mt={20}>
			<Text my={1} fontWeight={"bold"}>
				Deactivate Your Account
			</Text>
			<Text my={1}>You can activate your account anytime by logging in.</Text>
			<Button size={"sm"} colorScheme='red' onClick={freezeAccount}>
				Deactivate
			</Button>
		</Container>
	);
};
