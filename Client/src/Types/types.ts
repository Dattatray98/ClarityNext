import type { IconType } from 'react-icons';
import { RiChatSmileAiLine } from "react-icons/ri";
import { TbInfoOctagon, TbListDetails } from 'react-icons/tb';
import { HiOutlineHome } from "react-icons/hi2";


export const NavLinks: NavLinkItem[] =[
    { id: 1, icon: HiOutlineHome, label: "Home", path:"/home" },
    { id: 2, icon: TbInfoOctagon , label: "About" },
    { id: 3, icon: TbListDetails, label: "Features", path:"/features" },
    { id: 4, icon: RiChatSmileAiLine, label: "Chat With Ai", path:'/chatwithai' },
] 

export interface NavLinkItem {
    id: string | number;
    label: string;
    icon: IconType;
    path?: string;
}

export interface InTabLinksItem {
    id : Number;
    label : String;
    content: React.ReactNode;
}


export const BlogTabLinks = [
    {id:1, label: "All"},
    {id:2, label: "Trainding"}

]


export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  lastActive: Date;
}

export interface ApiResponse {
  success: boolean;
  answer?: string;   // optional, since backend may fail
  message?: string;  // optional, for error messages
}