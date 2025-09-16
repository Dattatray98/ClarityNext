import axios from "axios";
import { api } from "../api";

// Function to call the backend API
// AiRoutes.Fetch.ts
export const askBackendAI = async (prompt: string, conversationId?: string): Promise<string> => {
  try {
    const response = await api.post(
      "/api/ai/ask",
      {
        prompt,
        conversation_Id: conversationId,
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

    if (!response.data.answer) {
      throw new Error("No response received from AI");
    }
    return response.data;

  } catch (error: any) {
    console.error("API Error:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to get response from AI");
    }
    throw new Error("An unexpected error occurred");
  }
};


export const GetChats = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return {
        success: false,
        message: "Authentication token not found",
        data: [],
        count: 0
      };
    }

    const response = await api.get('/api/ai/getChats', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Validate response structure
    if (!response.data) {
      console.error("No data in response");
      return {
        success: false,
        message: "No data received from server",
        data: [],
        count: 0
      };
    }

    // Check if the expected data structure exists
    if (!response.data.success || !Array.isArray(response.data.data)) {
      console.error("Invalid response structure:", response.data);
      return {
        success: false,
        message: "Invalid response format from server",
        data: [],
        count: 0
      };
    }


    console.log(response.data.data)

    // Map data to include lastMessage safely
    const chats = response.data.data.map((chat: { _id: any; title: any; lastMessage: any; updatedAt: any; }) => ({
      id: chat._id,
      title: chat.title,
      lastMessage: chat.lastMessage || "No messages yet",
      updatedAt: chat.updatedAt || null
    }));



    console.log("Chats with last messages:", chats);

    return {
      success: true,
      data: chats,
      count: chats.length,
      message: response.data.message || "Chats retrieved successfully"
    };

  } catch (error: any) {
    console.error("Error fetching chats:", error);

    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || `Server error: ${error.response.status}`,
        data: [],
        count: 0,
        status: error.response.status
      };
    } else if (error.request) {
      return {
        success: false,
        message: "Network error. Please check your connection.",
        data: [],
        count: 0
      };
    } else {
      return {
        success: false,
        message: error.message || "An unexpected error occurred",
        data: [],
        count: 0
      };
    }
  }
};
