import type { IconType } from 'react-icons';
import { RiChatSmileAiLine } from "react-icons/ri";
import { TbInfoOctagon, TbListDetails } from 'react-icons/tb';
import { HiOutlineHome } from "react-icons/hi2";


export const NavLinks: NavLinkItem[] =[
    { id: 1, icon: HiOutlineHome, label: "Home", path:"/home" },
    { id: 2, icon: TbInfoOctagon , label: "About" },
    { id: 3, icon: TbListDetails, label: "Features" },
    { id: 4, icon: RiChatSmileAiLine, label: "Chat With Ai" },
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