import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const ollama_api = process.env.OLLAMA_API;

if (!ollama_api) {
  throw new Error("OLLAMA_API_KEY is not defined in environment variables");
}

export const askOllama = async (prompt: string): Promise<string>=>{
  try{

    const response = await axios.post(ollama_api, {
      model: process.env.AI_MODEL_NAME as string,
      prompt,
      max_tokens: 512,
      stream: false,
    });

    return response.data.response;

  }catch(error:any){
    console.error("mistral error : ", error.message);

    throw new Error("mistral requiest failed ; " + error.message);

  }
};


