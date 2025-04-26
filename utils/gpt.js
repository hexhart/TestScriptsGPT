import { OpenAI } from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Constants
const MODEL_NAME = "gpt-3.5-turbo";
const MAX_TOKENS = 500;

// Validate API key
if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API key. Please set OPENAI_API_KEY in your .env file.");
}

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Function to fetch GPT response
export async function fetchGPTResponse(prompt) {
    if (!prompt || typeof prompt !== "string") {
        throw new Error("Invalid prompt: Prompt must be a non-empty string.");
    }

    try {
        const response = await openai.chat.completions.create({
            model: MODEL_NAME,
            messages: [{ role: "user", content: prompt }],
            max_tokens: MAX_TOKENS,
        });

        // Extract and return the response content
        if (response?.choices?.length) {
            return response.choices[0].message.content.trim();
        } else {
            console.error("Unexpected API response format:", response);
            return "Error: No valid response received from GPT.";
        }
    } catch (error) {
        if (error.response) {
            console.error("API Error:", error.response.data);
            return `Error: ${JSON.stringify(error.response.data)}`;
        } else {
            console.error(`Error occurred while fetching GPT response for prompt: "${prompt}".`, error.message);
            return `Error: ${error.message}`;
        }
    }
}

// Run the function if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    if (process.argv.length > 2) {
        const prompt = process.argv.slice(2).join(" ");
        fetchGPTResponse(prompt)
            .then(console.log)
            .catch((error) => {
                console.error("Unhandled error:", error.message);
            });
    } else {
        console.error("Usage: node gpt.js <prompt>");
        process.exit(1);
    }
}
