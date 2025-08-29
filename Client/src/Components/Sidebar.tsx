
interface SidebarProps {
  tabs: { label: string; icon: React.ElementType }[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  // aiChatMode: boolean; // passed from Dashboard
  //  setAiChatMode: (val: boolean) => void; // passed from Dashboard
}

const Sidebar: React.FC<SidebarProps> = ({ tabs, activeTab, setActiveTab }) => {

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="border w-[22%] border-gray-200 shadow-md h-full rounded-xl px-6 py-10">
      {tabs.map((tab, index) => (
        <div key={index}
          onClick={() => handleTabClick(index)}
          className={`flex items-center gap-2 px-4 py-2 mt-3 cursor-pointer rounded-md transition ${activeTab === index
            ? "bg-blue-100 text-gray-800 font-medium border-l-4 border-gray-800 shadow-md"
            : "text-gray-700 font-medium hover:bg-gray-100 border border-gray-200"
            }`}>
          {tab.label}
        </div>
      ))}
    </div>
  )
}

export default Sidebar
