# Project Summary:
This is a cloned repository of a project I engaged in during my university's work placement internship module. It provides a framework for automated web testing using Puppeteer with seamless integration of OpenAI’s GPT models. 
The core idea is to speed up and simplify the process of generating, running, and organizing Puppeteer test scripts by leveraging AI.

### How it works:
   - You can copy website HTML source code into ChatGPT (or use our built-in GPT script integration) to quickly generate Puppeteer-based test scripts.
   - The workflow supports both manual and automated approaches: write your own prompts or process a batch of structured questions from a .txt file to automatically generate and save test scripts for your site.
   - All generated test scripts can be run, refined, and organized within the repository.
   - The project is designed with automation in mind—GitHub Actions monitor file changes, trigger test runs, and send notifications to your team, helping you keep track of updates and maintain high code quality.
### Key Features:
   -  Automated test generation using GPT-3.5/4.
   -  Easy integration with Puppeteer for browser automation.
   -  Batch processing of test prompts and site content for large-scale projects.
   -  Built-in support for GitHub Actions to automate test runs and notifications.
   -  Modular and extensible codebase for customization.

# Initial setup:
Install and setup Puppeteer OR use Puppeteer IDE browser extension for Chrome browser.
  
1. Copy the source code of the website page into chatGPT and generate the test scripts - be specific to mention Puppeteer syntax when creating the GPT prompt.
2. Copy the GPT generated tests scripts and paste into Puppeteer,
3. Run test to ensure the scripts are working,
4. Once the script is working successfully, save it into the Github tests folder.

## Project Stages Summary:
### Stage 1:
We started the project by using Puppeteer IDE browser (Chrome) extension and copying the DDMS's HTML source code into ChatGPT to generate usable test scripts in JavaScript code. We refined the codes by going through several iterations of changing the syntax and terminologies, and the level of detail the requests needed to be until it was generating working test scripts that actually run the automated testing on the browser.
- Note: For the GPT requests, you have to specify the file type and language you require generating or GPT will produce unusable scripts. Being specific is key! :) 

### Stage 2:
Using the Puppeteer with GPT integration, we can generate test scripts using AI by passing a .txt file with a specific structured questions. This integration is coded to loop through each questions in this .txt file, which then runs the automation process by generating what the question prompt requires and as a result, a response file would be generate as a .js file which will contain the test script code. From this, we require manual handling where we sort these tests into sections or folders to group the tests.
- Note: This can be automated to get GPT to name the files and even sort them into recommended groupings, for now these responses are generated in the "generated_responses" folder.
  
### Stage 3:
Github Actions were set up to simulate that if a file is changed in one location, a Github action will be triggered and it logs the change, and notifies our Team's Discord channel to report what was changed. We also added a Github Action that runs the login test .js file when change happens specifically in 'folder1' folder, this allows us to simulate running different .js tests when different sections of the site are updated. We then created a .js file named 'run_tests.js' that iterates through a stack of tests that we have manually sorted into one stack.
- Note: We plan to automate this process in the future by integrating the stage 2 GPT to name and sort the test files upon creation, making this process flow smoother.

## Project Changelogs
Update 10.12.24:
- Added Puppeteer, OpenAI, gpt.js, package.json files for GPT integration.
- GPT integration installation steps provided (below)
Additional notes: 
- As of now, the GPT works by running the code "npm run gpt" followed by -- and then in "  ", enter your prompt. For example, ' npm run gpt -- "what is gpt" '
- ~~Currently working on the functionality as stated in TO-DO section - For Puppeteer GPT process.~~

----------------------------------------------------
Update 18.12.24:
- Updated the GPT dependencies and libraries for added functionalities,
- Integrated GPT functionality into project folder to support reading website HTML code in .txt file, and use this content for further processing.
- GPT now supports reading "gpt_questions.txt" that contains the GPT queries to be fed to the GPT. 
- To activate PuppeteerGPT, run the script as "node generate_tests.js" which check the website content (HTML code), save this content and pass it to gpt_questions and process it to generate a javascript response file as response_*.js. This .js file contains the javascript test code to be used for testing the website.

----------------------------------------------------
Update 10.01.25:
- Updated GPT.js file to include the following:
  - Added constants for MODEL_NAME and MAX_TOKENS for better configurability.
  - Introduced API key validation to handle missing keys explicitly.
  - Added validation for prompt to ensure it’s a non-empty string.
  - Improved error handling with detailed messages, including the failing prompt.
  - Added a standalone execution check using import.meta.url to differentiate between direct execution and module imports.
  - Replaced explicit checks with optional chaining (?.) for cleaner code.
  - Enhanced readability and modularity of the code.
    
----------------------------------------------------------
## Integrate GPT to Puppeteer on Visual Studio Code IDE
### Notes: 
1. If you have cloned the repo into your local repository make sure to fetch updates to origin first ensuring that your local copy of the project repository is uptodate.
2. Ensure that you have your own GPT API Key in order for this integration to work. At the moment, we are currently using an active GPT API Key that has the full features. It may vary when using a trial version as that one has limitation.

## Installing PUPPETEER AND GPT Dependencies:

1. Puppeteer Dependencies: The first step is to install the puppeteer dependencies, this should download and install the necessary libraries for the puppeteer and once complete, the following new files should appear:
- package-lock.json
- package.json
- node_modules
Command used in terminal: npm install puppeteer

2. Install OpenAI dependencies: within the root folder, use "npm install openai". This should start downloading all the library dependencies for OpenAI. You can locate this new addition inside the node_modules folder under openai.

3. Configurations: This step is the tricky part, we need to configure the package.json file. Open the package.json file and it should consist of the following:
```
{
  "dependencies": {
    "openai": "^4.76.0",
    "puppeteer": "^23.10.2"
  }
}
```
Now update the content to:
```
{
  "name": "DakTestScripts",
  "version": "1.0.0",
  "type": "module",
  "main": "login-test.js",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "DakTech test scripts with GPT integration",
  "dependencies": {
    "openai": "^4.76.0",
    "puppeteer": "^23.10.1",
    "typescript": "^5.7.2"
  },
  "devDependencies": {
    "@types/node": "^20.17.9"
  },
  "scripts": {
    "start": "node login-test.js",
    "gpt": "node utils/gpt.js"
  },
  "overrides": {
    "whatwg-url": "^14.0.0"
  }
}
```
Note: From these updated scripts, notice that Typescript is also part of the dependencies, feel free to install that dependencies in your own local machine. That would be a separate tutorial. most important to take note in the code is the "dependencies" and "scripts: gpt: "node utils/gpt.js".

4. Adding GPT dependencies: In the root folder of the repository, add a new folder "utils" and create the "gpt.js" file. Open the "gpt.js" file and then enter the following code:
```
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
```
**NOTE: GPT.js code above is the latest update version as of 10-January-2025.**

5. Test GPT: test a gpt prompt by using the command "npm run gpt -- "enter prompt here"    " 
Note: The command used here is to test whether the GPT integration is successfully functional and does provide a response to your queries. This is the starting point where GPT AI integration is working for the project. If error shows up, you can research online for possible solutions, or contact the JCU Placement Testing Team to assist.

## Brief Summary to using PuppeteerGPT 
In order to activate PuppeteerGPT AI automation integration, we need to run the script as “node generate_tests.js” which would check the website content, save this content and pass it on to the gpt_questions and process this further and generate a javascript response file as response_*.js. This .js file contains the javascript test code to be used for testing the website.

### Important Files in Your Project:
1. generate_tests.js: Your main script file that processes questions.
2. utils/gpt.js: Contains the fetchGPTResponse function.
3. gpt_questions.txt: Input file containing questions (starting with Q:).
4. site.txt: Input file containing the HTML content.
5. generated_responses/: Folder where the GPT responses are saved as response_*.js files.

## **FUTURE UPDATES
- Linking Github/GitLab Actions with file location where site HTML code is located, this will allow us to create an action when a file gets changed in a specific part of the site.

----------------------------------------------------------
## ADDITIONAL NOTES:
- README file update as of ~~10.01.2025~~ 27/04/2025 by Hex
- Project repository does not include node_modules folder to avoid redundancy, 
- Running on this test script requires NodeJS installation as well.

**You have reached the end of this guide. Thank you.**

