import { useState } from 'react';
import { NavLinks } from "../Types/types";
import { FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="border-b border-gray-300 h-15 flex items-center p-5 w-full justify-between bg-blue-50">
      {/* Logo */}
      <div className='flex gap-1 cursor-pointer'>
        <FaGraduationCap className="text-[#013778] text-2xl md:text-3xl" />
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#013778] to-[#029097] bg-clip-text text-transparent">
          ClarityNext
        </h1>
      </div>

      {/* Desktop Navigation - hidden on mobile */}
      <div className="hidden md:flex gap-6 lg:gap-8 items-center">
        {NavLinks.map((navlink) => {
          const Icon = navlink.icon;
          return (
            <div
              className="flex items-center gap-1 hover:text-[#029097] transition-colors"
              key={navlink.id}
            >
              <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
              <a href={navlink.path} className="font-medium text-sm lg:text-lg cursor-pointer">
                {navlink.label}
              </a>
            </div>
          );
        })}

        <button
          onClick={() => navigate('/auth/login')}
          className="border cursor-pointer border-gray-400 shadow-md py-1.5 px-3 lg:py-2 lg:px-4 font-medium bg-gradient-to-tr from-blue-100 to-blue-300 rounded-xl hover:shadow-lg transition-shadow">
          Login/SignUp
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-[#013778] text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-blue-50 border-b border-gray-300 shadow-lg z-50">
          <div className="flex flex-col p-5 space-y-4">
            {NavLinks.map((navlink) => {
              const Icon = navlink.icon;
              return (
                <div
                  className="flex items-center gap-3 py-2 hover:text-[#029097] transition-colors"
                  key={navlink.id}
                  onClick={() => setIsMenuOpen(false)}

                >
                  <Icon className="w-5 h-5" />
                  <a className="font-medium text-lg cursor-pointer">
                    {navlink.label}
                  </a>
                </div>
              );
            })}

            <button
              onClick={() => navigate("/login")}
              className="border cursor-pointer border-gray-400 shadow-md py-2 px-4 font-medium bg-gradient-to-tr from-blue-100 to-blue-300 rounded-xl mt-4">
              Login/SignUp
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;