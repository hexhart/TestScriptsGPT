import fs from 'fs';
import path from 'path';
import { fetchGPTResponse } from './utils/gpt.js'; // Import GPT function

// Specify the path of the text file
const sitefilePath = 'site.txt'; // Replace with your file path

// Directory for the output files
const outputDir = './generated_responses/';

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Function to process questions
async function processQuestions() {
    try {
        // Step 1: Read the content of site.txt
        console.log('Reading HTML content from site.txt...');
        const sitefileContent = fs.readFileSync(sitefilePath, 'utf8'); // Use readFileSync for simplicity
        console.log('HTML content loaded successfully.\n');

        // Step 2: Send the site content to GPT
        console.log('Sending site content to GPT...');
        await fetchGPTResponse(`THIS IS THE SITE CONTENT:\n${sitefileContent}`);
        console.log('GPT has processed the site content.\n');

        // Step 3: Read the input file
        const inputFilePath = './gpt_questions.txt'; // Path to the questions file
        const data = fs.readFileSync(inputFilePath, 'utf8');

        // Debug: Print the raw content of the file
        console.log('Raw Content of gpt_questions.txt:\n', data);

        // Split into lines and filter relevant questions
        const lines = data.split('\n').filter(line => line.startsWith('Q:') && line.trim().endsWith('.'));
        
        // Debug: Print the detected lines for validation
        console.log(`Detected Questions (${lines.length}):`, lines);

        if (lines.length === 0) {
            console.log('No valid questions detected. Please check the format in gpt_questions.txt');
            return;
        }

        // Step 4: Process each question sequentially
        for (let i = 0; i < lines.length; i++) {
            const question = lines[i].replace('Q:', '').trim(); // Clean the question
            console.log(`Processing Question ${i + 1}: ${question}`);

            // Combine site content with the question for context
            const prompt = `
THIS IS THE SITE CONTENT:
${sitefileContent}

NOW ANSWER THIS QUESTION WITH A COMPLETE JAVASCRIPT CODE ONLY:
${question}
`;

            // Fetch GPT response
            const response = await fetchGPTResponse(prompt);

            // Write the raw JavaScript response directly to the file
            const formattedResponse = `/* Response for Question ${i + 1}: ${question} */\n${response}`;

            // Create a unique file name for each response
            const outputFilePath = path.join(outputDir, `response_${i + 1}.js`);

            // Write the response as raw JavaScript code
            fs.writeFileSync(outputFilePath, formattedResponse);

            console.log(`Response for Question ${i + 1} saved to ${outputFilePath}`);
        }

        console.log('All responses saved to individual files as JavaScript code.');
    } catch (error) {
        console.error('Error processing questions:', error.message);
    }
}

// Start the process
processQuestions();
