import userAtom from "../atoms/userAtom";
import { useSetRecoilState } from "recoil";
import useToastHook from "./useToastHook";

const useLogout = () => {
	const setUser = useSetRecoilState(userAtom);
	const showToast = useToastHook();

	const logout = async () => {
		try {
			const res = await fetch("/api/users/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}

			localStorage.removeItem("user-info");
			setUser(null);
		} catch (error) {
			showToast("Error", error, "error");
		}
	};

	return logout;
};

export default useLogout;