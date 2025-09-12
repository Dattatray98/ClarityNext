import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from '../Components/AiChat.Components/ChatMessage';
import type { Chat } from '../Types/types';
import { HiChevronDoubleRight } from "react-icons/hi";
import { handleSendMessage, handleNewChat } from '../Hooks/AiChatPage.hooks/functions';
import AISidebar from '../Components/AiChat.Components/AISidebar';

const AIChatPage: React.FC = () => {
  // State for chats, current chat, and user input
  const [currentChatId, setCurrentChatId] = useState('1');
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [chats, setChats] = useState<Chat[]>([    // Creatieng a default chat
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

  // Refs for auto-scrolling and focusing
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Get current chat
  const currentChat = chats.find(chat => chat.id === currentChatId) || chats[0];

  // Function to select a chat
  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setPrompt('');
    setIsTyping(false);
    setError(null);
  };

  // Function to delete a chat
  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (chats.length <= 1) {
      return;
    }

    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);

    // If we deleted the current chat, switch to the first one
    if (currentChatId === chatId) {
      setCurrentChatId(updatedChats[0].id);
    }
  };

  // Function to create a new chat
  const handleNewChatClick = () => {
    handleNewChat(
      chats,
      setCurrentChatId,
      setChats,
      setPrompt,
      setIsTyping,
      setError
    );
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
      handleSendMessage(
        prompt,
        chats,
        currentChatId,
        setChats,
        setPrompt,
        setIsTyping,
        setError
      );
    }
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);

    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className="flex h-screen bg-gray-50 p-3 bg-gradient-to-bl from-blue-100 to-gray-100">
      {/* Sidebar */}
      <AISidebar 
        chats={chats} 
        currentChatId={currentChatId} 
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onNewChat={handleNewChatClick}
        sidebarOpen={sidebarOpen}
      />

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
                value={prompt}
                onChange={handleTextareaChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 border-2 border-gray-200 rounded-lg py-2 px-4 font-medium mr-2 resize-none focus:outline-none focus:border-gray-400 focus:shadow-sm"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '150px' }}
              />
              <button
                onClick={() => {
                  handleSendMessage(
                    prompt,
                    chats,
                    currentChatId,
                    setChats,
                    setPrompt,
                    setIsTyping,
                    setError
                  )
                }}

                disabled={prompt.trim() === '' || isTyping}
                className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:border-gray-300 hover:border justify-center flex items-center flex-shrink-0"
                style={{ height: '44px', width: '44px' }}
              >
                <HiChevronDoubleRight className='h-6 w-6' />
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