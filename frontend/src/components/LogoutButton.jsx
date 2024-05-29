import { Button } from "@chakra-ui/react"
import { useSetRecoilState } from "recoil"
import userAtom from "../atoms/userAtom"
import useToastHook from "../hooks/useToastHook";
import { HiOutlineLogout } from "react-icons/hi";

export const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useToastHook();
    const handleLogout = async()=>{
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);
            if(data.error){
                showToast("Error", data.error, "error");
                return;
            }
            localStorage.removeItem("user-info");
            setUser(null);
        } catch (error) {
            showToast("Error", error, "error");
        }
    }
  return (
    <Button position={"fixed"} top={"30px"} right={"70px"} size={"md"} onClick={handleLogout} bg={"green.400"}><HiOutlineLogout/></Button>
  )
}
