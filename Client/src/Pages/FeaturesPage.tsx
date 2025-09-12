import { useState } from "react";
import { AiChat, Home, StayUpdated, Upload } from "../Components/FeaturesTab";
import Navbar from "../Components/Navbar"
import Sidebar from "../Components/Sidebar"
import { BiHomeSmile } from "react-icons/bi"
import { RiChatSmileAiLine } from "react-icons/ri"
import { RxUpdate, RxFileText } from "react-icons/rx"
import { Sparkles } from "lucide-react";


const FeaturesPage = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { label: "Home", icon: BiHomeSmile, content: <Home /> },
        { label: "Resume", icon: RxFileText, content: <Upload /> },
        { label: "AI Chat", icon: RiChatSmileAiLine, content: <AiChat /> },
        { label: "Stay Updated", icon: RxUpdate, content: <StayUpdated />},
        { label: "AI Interview Avatar", icon:Sparkles }
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
