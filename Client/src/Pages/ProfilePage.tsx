import Navbar from "../Components/Navbar"
import About from "../Components/Profile.Component/About"
// import Experience from "../Components/Profile.Component/Experience"
import ProflieBlock from "../Components/Profile.Component/ProflieBlock"
import UserInfoForm from "../Components/Profile.Component/UserInfoForm"
// import Userskills from "../Components/Profile.Component/Userskills"

const ProfilePage = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="px-36 py-10 flex-col flex gap-10">
        <ProflieBlock />
        <About/>
        <UserInfoForm />
      </div>
    </div>
  )
}

export default ProfilePage
