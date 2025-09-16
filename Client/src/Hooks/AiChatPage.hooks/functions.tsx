import type { Message, Chat } from "../../Types/types";
import { api } from "../api";

// Message handler function

export async function handleSendMessage(
    Prompt: string,
    chats: Chat[],
    currentChatId: string,
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>,
    setPrompt: React.Dispatch<React.SetStateAction<string>>,
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
) {
    if (Prompt.trim() === "") return;

    const userMessage: Message = {
        id: Date.now().toString(),
        text: Prompt,
        sender: "user",
        timestamp: new Date(),
    };

    const updatedChats = chats.map((chat) =>
        chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, userMessage],
                lastActive: new Date(),
            }
            : chat
    );

    setChats(updatedChats);
    setPrompt("");
    setIsTyping(true);
    setError(null);

    try {
        const currentChat = updatedChats.find(chat => chat.id === currentChatId);
        const conversationId = currentChat?.conversationId; // Get stored conversationId

        const response = await api.post(
            "/api/ai/ask",
            {
                prompt: Prompt,
                conversation_Id: conversationId, // Send it to backend
                role: "user",
                content: Prompt,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                timeout: 120000,
            }
        );

        if (!response.data.success) {
            throw new Error(response.data.message || "AI request failed");
        }

        const aiResponseText = response.data.answer;
        const newConversationId = response.data.conversation_Id; // Get new conversationId from response

        const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: aiResponseText,
            sender: "ai",
            timestamp: new Date(),
        };

        const updatedChatsWithAI = updatedChats.map((chat) =>
            chat.id === currentChatId
                ? {
                    ...chat,
                    messages: [...chat.messages, aiResponse],
                    lastActive: new Date(),
                    conversationId: newConversationId, // Store the conversationId
                    title:
                        chat.title === "New Chat"
                            ? Prompt.slice(0, 30) +
                            (Prompt.length > 30 ? "..." : "")
                            : chat.title,
                }
                : chat
        );

        setChats(updatedChatsWithAI);
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : "Failed to get AI response";
        setError(errorMessage);

        const errorResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: `Sorry, I encountered an error: ${errorMessage}`,
            sender: "ai",
            timestamp: new Date(),
        };

        const updatedChatsWithError = updatedChats.map((chat) =>
            chat.id === currentChatId
                ? { ...chat, messages: [...chat.messages, errorResponse] }
                : chat
        );

        setChats(updatedChatsWithError);
    } finally {
        setIsTyping(false);
    }
}


// New chat handler function

export const handleNewChat = (
    chats: Chat[],
    setCurrentChatId: React.Dispatch<React.SetStateAction<string>>,
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>,
    setPrompt: React.Dispatch<React.SetStateAction<string>>,
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
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
        conversationId: undefined,
        updatedAt: undefined,
        lastMessage: undefined
    };

    setChats([newChat, ...chats]);
    setCurrentChatId(newChatId);
    setPrompt('');
    setIsTyping(false);
    setError(null);
};