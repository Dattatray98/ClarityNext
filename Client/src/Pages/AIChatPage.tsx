import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from '../Components/ChatMessage';
import type { Chat, Message } from '../Types/types';
import {Sparkles } from "lucide-react";
import { askBackendAI } from '../Hooks/AiRoutes.Fetch';
import { MdDelete } from 'react-icons/md';
import { HiChevronDoubleRight } from "react-icons/hi";

const AIChatPage: React.FC = () => {
  // State for chats, current chat, and user input
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'Getting Started',
      messages: [
        {
          id: '1',
          text: "Hello! I'm your AI assistant. How can I help you today?",
          sender: 'ai',
          timestamp: new Date(),
        },
      ],
      lastActive: new Date(),
    },
  ]);


  const [currentChatId, setCurrentChatId] = useState('1');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Refs for auto-scrolling and focusing
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Get current chat
  const currentChat = chats.find(chat => chat.id === currentChatId) || chats[0];


  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    // Update chats with new message
    const updatedChats = chats.map(chat => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          messages: [...chat.messages, userMessage],
          lastActive: new Date(),
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setInputText('');
    setIsTyping(true);
    setError(null);

    try {
      // Call the backend API
      const aiResponseText = await askBackendAI(inputText);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };

      const updatedChatsWithAI = updatedChats.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, aiResponse],
            lastActive: new Date(),
            title: chat.title === 'New Chat' ? inputText.slice(0, 30) + (inputText.length > 30 ? '...' : '') : chat.title,
          };
        }
        return chat;
      });

      setChats(updatedChatsWithAI);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get AI response';
      setError(errorMessage);

      // Add error message to chat
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, I encountered an error: ${errorMessage}`,
        sender: 'ai',
        timestamp: new Date(),
      };

      const updatedChatsWithError = updatedChats.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, errorResponse],
          };
        }
        return chat;
      });

      setChats(updatedChatsWithError);
    } finally {
      setIsTyping(false);
    }
  };

  // Function to create a new chat
  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: Chat = {
      id: newChatId,
      title: 'New Chat',
      messages: [
        {
          id: '1',
          text: "Hello! I'm your AI assistant. What would you like to talk about today?",
          sender: 'ai',
          timestamp: new Date(),
        },
      ],
      lastActive: new Date(),
    };

    setChats([newChat, ...chats]);
    setCurrentChatId(newChatId);
    setInputText('');
    setIsTyping(false);
    setError(null);
  };

  // Function to select a chat
  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setInputText('');
    setIsTyping(false);
    setError(null);
  };

  // Function to delete a chat
  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (chats.length <= 1) {
      // Don't delete the last chat
      return;
    }

    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);

    // If we deleted the current chat, switch to the first one
    if (currentChatId === chatId) {
      setCurrentChatId(updatedChats[0].id);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat.messages]);

  // Focus input when chat changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentChatId]);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);

    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className="flex h-screen bg-gray-50 p-3 bg-gradient-to-bl from-blue-100 to-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-100 shadow-md border-2 border-gray-200 rounded-xl text-white w-[35vh] flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-0' : '-ml-64'
          } md:ml-0`}
      >
        <div className="p-4">
          <button
            onClick={handleNewChat}
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
                onClick={() => handleSelectChat(chat.id)}
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
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                  className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MdDelete className='w-6 h-6'/>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden border-2 border-gray-200 ml-1 rounded-xl">
        {/* Header */}
        <header className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 focus:outline-none md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800 truncate ml-2">
            {currentChat.title}
          </h1>
          <div className="w-6"></div> {/* Spacer for balance */}
        </header>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 mt-4">
            <p>{error}</p>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 pb-20 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            {currentChat.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}


            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="text-gray-800 p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white p-2 border-t border-gray-200">
          <div className="max-w-4xl mt-1 mx-auto">
            <div className="flex items-end">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={handleTextareaChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 border-2 border-gray-200 rounded-lg py-2 px-4 font-medium mr-2 resize-none focus:outline-none focus:border-gray-400 focus:shadow-sm"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '150px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputText.trim() === '' || isTyping}
                className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:border-gray-300 hover:border justify-center flex items-center flex-shrink-0"
                style={{ height: '44px', width: '44px' }}
              >
                <HiChevronDoubleRight className='h-6 w-6'/>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI may produce inaccurate information about people, places, or facts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;