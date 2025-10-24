// Important: This file is for the Vercel server, not the client.
// You might need to install these types for your editor: npm install --save-dev @vercel/node
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

// This function will be executed on the server when a request is made to /api/gemini
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // 1. Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. Initialize the Gemini client ON THE SERVER.
    // The API key is securely stored in Vercel's environment variables.
    // The `new GoogleGenAI` import and usage might show an error in some editors
    // if @google/genai is not in package.json, but Vercel will resolve it.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // 3. The frontend will send the prompt and schema in the request body.
    const { prompt, schema } = request.body;

    // A small validation
    if (!prompt || !schema) {
        return response.status(400).json({ error: 'Missing prompt or schema in request body' });
    }

    // 4. Call the actual Gemini API from the server
    const geminiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.8,
      }
    });

    // 5. Send the result from Gemini back to your frontend
    const jsonText = geminiResponse.text.trim();
    const resultData = JSON.parse(jsonText);

    return response.status(200).json(resultData);

  } catch (error: any) {
    console.error("Error in /api/gemini:", error);
    return response.status(500).json({ error: 'Failed to generate content from Gemini API', details: error.message });
  }
}
