import { GenerateContentResult, GoogleGenerativeAI } from "@google/generative-ai";
import Constants from 'expo-constants';
const api_Key = Constants.expoConfig?.extra?.API_KEY;

export async function analyse(text:string, context:string): Promise<string> {

    let prompt:string = `You are a context analyzer. You will receive two inputs: a text and a context. Analyze the text based on the given context and determine the sentiment expressed in the text. Return only one word as the sentiment: 'Positive', 'Negative', or 'Neutral' Text: ${text} Context: ${context}`;

    try {
        if(api_Key) {
        const AI = new GoogleGenerativeAI(api_Key);
        const modelo = AI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const res: GenerateContentResult = await modelo.generateContent(prompt);

        // Check if candidates exist before accessing them
        if (!res.response.candidates) {
            console.error("API response did not include candidates.");
            // Handle the error (e.g., return a default value)
            return "An error occurred. Please try again.";
        }

        const response = res.response.candidates[0].content.parts[0].text;
        return response || "An error occurred. Please try again.";
        } else {
            console.error("API_KEY not found.");
            return "An error occurred. Please try again.";
        }
    } catch (error) {
        console.error("Erro ao gerar resposta:", error);
        return "An error occurred. Please try again.";
    }
}