import { useNavigate } from "react-router-dom"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import AboutSections from "./AboutSections"

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="relative overflow-hidden">
            <Navbar />
            {/* Hero Section */}
            <section className="relative w-full flex bg-gradient-to-b from-blue-100 to-white py-20 text-center"
            >

                <div className="max-w-4xl mx-auto px-4 z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#029097] drop-shadow-lg">
                        Navigate Your Future with Clarity
                    </h1>
                    <p className="text-lg text-gray-600 mt-5 mb-8">
                        ClarityNext helps students discover the right direction in education and career. Get clear guidance, resources, and a roadmap to move from confusion to confidence.
                    </p>

                    <div className="flex gap-8 justify-center">
                        <button onClick={()=> navigate("/home")} className="px-8 py-2 text-[#029097] text-lg shadow-md font-medium bg-gradient-to-bl from-blue-200 to-gray-200 hover:bg-gradient-to-br transition-all border-gray-300 border-t rounded-2xl duration-500 z-10 relative">
                            Get Started
                        </button>
                    </div>
                </div>

                <div className="absolute h-80 top-0 right-0">
                    <img src="bg3.png" alt="ai" className="z-10 h-80 rotate-180" />
                </div>

                <div className="absolute h-80 bottom-0">
                    <img src="bg3.png" alt="ai" className="z-10 h-80" />
                </div>
            </section>

            <AboutSections />
            
          
            <Footer />
        </div>
    )
}

export default Home