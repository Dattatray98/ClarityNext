import axios, { AxiosError, AxiosResponse } from "axios";

const OLLAMA_API = "http://localhost:11434/api/generate";

interface OllamaRequest {
  model: string;
  prompt: string;
  stream: boolean;
}

interface OllamaResponse {
  response: string;
  model?: string;
  created_at?: string;
  done?: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

export async function askOllama(prompt: string): Promise<string> {
  try {
    const requestData: OllamaRequest = {
      model: "mistral",
      prompt: prompt,
      stream: true
    };

    const response: AxiosResponse<OllamaResponse> = await axios.post(OLLAMA_API, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000 // 30 second timeout
    });

    if (!response.data.response) {
      throw new Error("No response received from Ollama API");
    }

    return response.data.response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Ollama API error:", error.response?.data || error.message);
      throw new Error(`Ollama API error: ${error.response?.status} - ${error.response?.statusText}`);
    } else if (error instanceof Error) {
      console.error("Error calling Ollama:", error.message);
      throw error;
    } else {
      console.error("Unknown error calling Ollama");
      throw new Error("Unknown error occurred while calling Ollama");
    }
  }
}