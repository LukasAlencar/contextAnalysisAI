import { GenerateContentResult, GoogleGenerativeAI } from "@google/generative-ai";
import Constants from 'expo-constants';

const api_Key = Constants.expoConfig?.extra?.API_KEY;

export type SentimentProps = {
    sentimento: string;
    explicacao: string;
};

export async function analyse(text: string, context: string): Promise<SentimentProps | null> {
    const prompt: string = `You are a context analyzer. You will receive two inputs: a text and a context. Analyze the text based on the given context and determine the sentiment expressed in the text. Return the sentiment as a word ('Positivo', 'Negativo', 'Neutro' ) and a brief explanation in portuguese. All response shold be in JSON Format: Exemple: { 'sentimento':'<sentiment>', 'explicacao': '<explanation>' } Text: ${text} Context: ${context} `;

    function extractJSON(textWithJSON: string | undefined): SentimentProps | null {
        if (textWithJSON != undefined) {
          try {
            // Remove o "json" do início do texto se estiver presente
            let cleanText = textWithJSON.trim();
            
            // Verifica se o texto está cercado por três crases e remove essas crases
            if (cleanText.startsWith('```') && cleanText.endsWith('```')) {
              cleanText = cleanText.slice(3, -3).trim();  // Remove as três crases do início e do fim
            }
            
            if (cleanText.startsWith('json')) {
              cleanText = cleanText.slice(4).trim(); // Remove a palavra "json" e espaços extras
            }
            
      
            // Tentativa de converter o texto limpo em JSON
            const objetoJSON: SentimentProps = JSON.parse(cleanText);
            return objetoJSON;
          } catch (error) {
            console.error('Erro ao analisar o JSON:', error);
            return null;
          }
        } else {
          return { sentimento: "Neutral", explicacao: "No context provided." };
        }
      }
      



    try {
        if (api_Key) {
            const AI = new GoogleGenerativeAI(api_Key);
            const modelo = await AI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const res: GenerateContentResult = await modelo.generateContent(prompt);

            if (!res.response.candidates) {
                console.error("API response did not include candidates.");
                return null;
            }

            const response = res.response.candidates[0].content.parts[0].text
            console.log("API response:", response);
            const responseJSON = extractJSON(response);
            return responseJSON;
        } else {
            console.error("API_KEY not found.");
            return null;
        }
    } catch (error) {
        console.error("Erro ao gerar resposta:", error);
        return null;
    }
}
