import { FaFolderOpen } from "react-icons/fa";
import {MdOutlineFileUpload} from "react-icons/md"
import Navbar from "../Components/Navbar"
import Sidebar from "../Components/Sidebar"
import { Home, Upload } from "../Components/HomeTabs";
import { useState } from "react";

const HomePage = () => {
  const [ activeTab, setActiveTab ] = useState(0)

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        //setAiChatMode(index === 2); // AI Chat mode only when AI Chat tab is clicked
    };


  const tabs = [
    { label: "Home", icon: FaFolderOpen, content: <Home /> },
    { label: "Upload", icon: MdOutlineFileUpload, content: <Upload /> },
    // { label: "Ai Chat", icon: RiChatSmileAiLine, content: <AiChat /> },
    // { label: "Highlights", icon: FaRegStar, content: <div>this is Highlights page</div> },
    // { label: "Settings", icon: IoSettingsOutline, content: <Settings /> },
  ];

  return (
    <div>
      <Navbar />
      <div className="border h-[93.5vh] py-10 px-20 flex gap-2">

        <Sidebar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={handleTabClick}
        />
        <div className="border w-[77%] rounded-xl">

        </div>
      </div>

    </div>
  )
}

export default HomePage
