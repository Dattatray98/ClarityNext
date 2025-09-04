import axios from "axios";
import type { ApiResponse } from "../../Types/types";

// Function to call the backend API
export const askBackendAI = async (question: string): Promise<string> => {
  try {
    const response = await axios.post<ApiResponse>(
      "http://localhost:5000/api/ai/ask",
      { question},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        timeout: 120000, // Timeout in seconds
      }
    );

    // Check backend success flag
    if (!response.data.success) {
      throw new Error(response.data.message || "AI request failed");
    }

    // Ensure answer exists
    if (!response.data.answer) {
      throw new Error("No response received from AI");
    }

    return response.data.answer;
  } catch (error) {
    console.error("API Error:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to get response from AI"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};



export const recentChat = async ()=>{
  try {
    const response = await axios.get("http://localhost:5000/api/ai/recentChats",
      {
        headers:{
          Authorization : `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );


    if(!response.data.success){
      throw new Error(response.data.message)
    }

    if(!response.data.convo){
      throw new Error("no responce recevied from backend ")
    }


    


    
  }catch(error){

  }
}