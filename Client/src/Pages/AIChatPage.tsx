import React, { useState, useRef, useEffect } from 'react';

// Define TypeScript interfaces
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  lastActive: Date;
}

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
  
  // Refs for auto-scrolling and focusing
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Get current chat
  const currentChat = chats.find(chat => chat.id === currentChatId) || chats[0];

  // Function to handle sending a message
  const handleSendMessage = () => {
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
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${inputText}". This is a simulated response from the AI assistant. In a real application, this would be replaced with actual AI-generated content.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      const updatedChatsWithAI = updatedChats.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, aiResponse],
            lastActive: new Date(),
          };
        }
        return chat;
      });
      
      setChats(updatedChatsWithAI);
      setIsTyping(false);
    }, 1500);
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
  };

  // Function to select a chat
  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setInputText('');
    setIsTyping(false);
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`bg-gray-900 text-white w-64 flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'ml-0' : '-ml-64'
        } md:ml-0`}
      >
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Chat
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2 text-xs text-gray-400 uppercase tracking-wider">Recent Chats</div>
          <div className="space-y-1 px-2">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`p-3 rounded-lg cursor-pointer flex justify-between items-center group ${
                  currentChatId === chat.id ? 'bg-gray-700' : 'hover:bg-gray-800'
                }`}
              >
                <div className="truncate flex-1">
                  <div className="font-medium text-sm truncate">{chat.title}</div>
                  <div className="text-xs text-gray-400">
                    {chat.lastActive.toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                  className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div className="text-sm">
              <div className="font-medium">AI Assistant</div>
              <div className="text-gray-400">Online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
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

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 pb-20">
          <div className="max-w-3xl mx-auto">
            {currentChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 shadow'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white text-gray-800 shadow rounded-lg p-4">
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
        <div className="bg-white border-t p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={handleTextareaChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 border rounded-lg py-2 px-4 mr-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '150px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputText.trim() === ''}
                className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                style={{ height: '44px', width: '44px' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
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