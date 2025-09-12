import type { IconType } from 'react-icons';
import { RiChatSmileAiLine } from "react-icons/ri";
import { TbInfoOctagon, TbListDetails } from 'react-icons/tb';
import { HiOutlineHome } from "react-icons/hi2";
import { Sparkles } from "lucide-react";



export const NavLinks: NavLinkItem[] = [
  { id: 1, icon: HiOutlineHome, label: "Home", path: "/home" },
  { id: 2, icon: TbInfoOctagon, label: "About" },
  { id: 3, icon: TbListDetails, label: "Features", path: "/features" },
  { id: 4, icon: RiChatSmileAiLine, label: "Chat With Ai", path: '/chatwithai' },
  { id: 5, icon: Sparkles, label: "Mock Interview", path: "/" }
]


export const Features: FeaturesItem[] = [
  { id: 1, lable: "Interview Practice", Description: "Last Mock Interview: “Good clarity, needs more confidence." },
  { id: 2, lable: "JD Fit Analyzer+", Description: "Latest Job Description Fit: 76% match" },
  { id: 3, lable: "Resume Score Card" },
  { id: 4, lable: "Career Roadmap" },
]


export interface FeaturesItem {
  id: string | number
  lable: string;
  Description?: string;
  path?: string;
}


export interface NavLinkItem {
  id: string | number;
  label: string;
  icon: IconType;
  path?: string;
}

export interface InTabLinksItem {
  id: Number;
  label: String;
  content: React.ReactNode;
}


export const BlogTabLinks = [
  { id: 1, label: "All" },
  { id: 2, label: "Trainding" }

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
  conversationId?: string;
}

export interface ApiResponse {
  success: boolean;
  answer?: string;   
  message?: string;  // optional, for error messages
}



export interface IConversation {
  _id: string;
  user_Id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}


export interface IMesssage {
  _id: string;
  conversation_Id: string;
  role: "user" | "assistant"
  content: string;
  createdAt: string;
  updatedAt: string;
}