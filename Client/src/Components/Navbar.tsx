import { NavLinks } from "../Types/types"
import { FaGraduationCap } from "react-icons/fa";
const Navbar = () => {

    return (
        <nav className="border-b border-gray-300 h-15 flex items-center p-5 w-full justify-between bg-blue-50">
            <div className='flex gap-1 cursor-pointer'>
                <FaGraduationCap className="text-[#013778] text-3xl" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#013778] to-[#029097] bg-clip-text text-transparent">
                    ClarityNext
                </h1>
            </div>
            <div className="flex gap-20 items-center">
                <div className="flex gap-8">
                    {NavLinks.map((navlink) => (
                        <h1 className="font-medium cursor-pointer">{navlink.lable}</h1>
                    ))}
                </div>
                <button className="border cursor-pointer border-gray-400 shadow-md py-2 px-4 font-medium bg-gradient-to-tr from-blue-100 to-blue-300 rounded-xl">
                    Login/SignUp
                </button>
            </div>
        </nav>
    )
}

export default Navbar
