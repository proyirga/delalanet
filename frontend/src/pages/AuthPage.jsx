import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import SignupCard from "../components/SignupCard";
import LoginCard from "../components/LoginCard";
export const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
  return (
    <>
    {authScreenState === "login" ? <LoginCard/> : <SignupCard/>}
    </>
  )
}
