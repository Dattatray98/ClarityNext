import { useState } from "react";
import { Home, Upload } from "../Components/HomeTabs";
import Navbar from "../Components/Navbar"
import Sidebar from "../Components/Sidebar"
import { FaHome } from "react-icons/fa";

const FeaturesPage = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { label: "Home", icon: FaHome, content: <Home /> },
        { label: "Upload", icon: FaHome, content: <Upload /> },
    ];

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };


    return (
        <div className="bg-gradient-to-bl from-[#dffafc] to-[#e6e3fe]">
            <Navbar />

            <div className="flex py-3 px-5 gap-2 justify-center w-full">
                <Sidebar
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={handleTabClick}
                />

                 <div className="border  bg-gradient-to-b from-[#e2f7f8] to-gray-50  border-gray-200 shadow-md rounded-xl w-[100%] min-h-[90.8vh]">
                    {tabs[activeTab].content}
                </div>

            </div>
        </div>
    )
}

export default FeaturesPage
