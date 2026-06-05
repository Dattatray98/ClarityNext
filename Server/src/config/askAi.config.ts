import axios from "axios";
import dotenv from "dotenv";
import ollama from "ollama";
dotenv.config();


export const askOllama = async (prompt: string): Promise<string> => {
  try {

    const response = await ollama.generate({
      model: "llama3",
      prompt: prompt
    })

    return response.response;

  } catch (error: any) {
    console.error("mistral error : ", error.message);

    throw new Error("mistral requiest failed ; " + error.message);

  }
};


