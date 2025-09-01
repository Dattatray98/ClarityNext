// // File: src/utils/googleAI.ts
// import { GoogleGenAI } from '@google/genai';
// import dotenv from 'dotenv';
// dotenv.config();

// // Initialize AI client once
// const ai = new GoogleGenAI({
//   apiKey: process.env.GOOGLE_API_KEY!,
// });

// /**
//  * Generate text from any prompt using Google Gemini AI
//  * @param prompt The text prompt to send to AI
//  * @returns Generated text
//  */
// export async function generateFromPrompt(prompt: string): Promise<string> {
//   if (!prompt) throw new Error('Prompt cannot be empty');

//   try {
//     const response = await ai.models.generateContentStream({
//       model: 'gemini-2.0-flash-lite',
//       config: {}, // optional: add temperature, max tokens, etc.
//       contents: [
//         {
//           role: 'user',
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     // Collect streaming chunks into one string
//     let result = '';
//     for await (const chunk of response) {
//       result += chunk.text;
//     }

//     return result;
//   } catch (error) {
//     console.error('Error generating text:', error);
//     throw new Error('AI generation failed');
//   }
// }
