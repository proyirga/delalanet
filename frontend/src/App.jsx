import { Container } from "@chakra-ui/react"
import { HomePage } from "./pages/HomePage"
import { Navigate, Route, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import UserPost from "./components/UserPost"
import { AuthPage } from "./pages/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import { LogoutButton } from "./components/LogoutButton"
import UpdateProfilePage from "./pages/UpdateProfilePage"

function App() {
  const user = useRecoilValue(userAtom);
  console.log(user);
  return (
    <Container maxW={'620px'}>

      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!user ? <AuthPage />: <Navigate to="/" />} />
        <Route path="/update" element={user ? <UpdateProfilePage />: <Navigate to="/auth" />} />


        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<UserPost />} />
      </Routes>
      {user && <LogoutButton />}
    </Container>
  )
}

export default App
