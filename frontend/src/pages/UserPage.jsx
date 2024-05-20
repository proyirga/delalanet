import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
    <>
    <UserHeader/>
    <UserPost likes ={12} price={"4.5M"} postImg="car-1.jpg" postTitle="Car for sale"/>
    <UserPost likes ={1300} price={"4.1k"} postImg="post2.png" postTitle="Appartment for rent"/>
    <UserPost likes ={1100} price={2.0}k postTitle="Condominum for rent"/>
    </>
  )
}

export default UserPage