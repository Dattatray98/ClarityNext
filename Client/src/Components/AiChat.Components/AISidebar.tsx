import { Sparkles } from "lucide-react";
import { MdDelete } from 'react-icons/md';
import type { Chat } from '../../Types/types';

interface AISidebarProps {
  chats: Chat[];
  currentChatId: string;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string, e: React.MouseEvent) => void;
  onNewChat: () => void;
  sidebarOpen: boolean;
}

const AISidebar = ({ 
  chats, 
  currentChatId, 
  onSelectChat, 
  onDeleteChat, 
  onNewChat, 
  sidebarOpen 
}: AISidebarProps) => {
  return (
    <div
      className={`bg-gray-100 shadow-md border-2 border-gray-200 rounded-xl text-white w-[35vh] flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-0' : '-ml-64'
        } md:ml-0`}
    >
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full bg-gradient-to-tr from-[#029097] to-[#01479d] hover:bg-blue-300 border-2 text-white py-2 px-4 rounded-xl flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2 text-xs font-medium text-gray-600 uppercase tracking-wider">Recent Chats</div>
        <div className="space-y-2 px-2">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`p-3 rounded-lg cursor-pointer flex justify-between items-center group ${currentChatId === chat.id ? 'bg-blue-50 shadow-sm border border-gray-200' : 'border border-gray-200 bg-gray-200 hover:bg-gray-100'
                }`}
            >
              <div className="truncate flex-1">
                <div className="font-medium text-sm truncate text-gray-700">{chat.title}</div>
                <div className="text-xs text-gray-400">
                  {chat.lastActive.toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={(e) => onDeleteChat(chat.id, e)}
                className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MdDelete className='w-6 h-6' />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="py-6 px-6 border-t-2 border-gray-200 bg-white rounded-b-xl">
        <div className="space-x-6 ">
          <div className='flex gap-1 items-center cursor-pointer'>
            <Sparkles className="text-[#013778] h-5 w-5" />
            <h1 className="text-xl md:text-xl font-bold bg-gradient-to-r from-[#013778] to-[#029097] bg-clip-text text-transparent">
              Neo AI
            </h1>
          </div>
          <p className='text-gray-500 text-[11px] ml-6 font-medium mt-[-6px]'>From questions to clarity—instantly.</p>
        </div>
      </div>
    </div>
  )
}

export default AISidebar