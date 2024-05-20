import { Container } from "@chakra-ui/react"
import { HomePage } from "./pages/HomePage"
import { Route, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import UserPost from "./components/UserPost"

function App() {
  return (
    <Container maxW={'620px'}>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<UserPost />} />
      </Routes>
    </Container>
  )
}

export default App
