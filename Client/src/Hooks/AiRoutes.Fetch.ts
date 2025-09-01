import axios from "axios";
import type { ApiResponse } from "../Types/types";

// Function to call the backend API
export const askBackendAI = async (question: string): Promise<string> => {
  try {
    const response = await axios.post<ApiResponse>(
      "http://localhost:8000/api/ai/ask",
      { question },
      {
        headers: { "Content-Type": "application/json" },
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
