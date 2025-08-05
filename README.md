Voice Bot
Voice Bot is a single-page web application that allows users to interact with an AI-powered assistant via voice or text input. The bot answers questions about the creator's background and experience, leveraging GitHub AI for text responses and Azure Text-to-Speech (TTS) for voice output. The application is built with HTML, CSS, and JavaScript, and deployed on Vercel with a serverless function to securely handle API calls.
Features

Voice Interaction: Use speech recognition to ask questions (supported in Chrome and Edge).
Text Input: Type questions for the AI to answer.
Voice Responses: Hear AI responses using Azure TTS or browser-based speech synthesis as a fallback.
Responsive Design: Mobile-friendly interface with a modern, clean UI.
Secure API Handling: Sensitive data (API keys and system prompt) is managed via environment variables and serverless functions.

Tech Stack

Frontend: HTML, CSS, JavaScript
APIs: GitHub AI (for text responses), Azure TTS (for voice output)
Deployment: Vercel (static files + serverless functions)
Dependencies: node-fetch (for serverless API calls)

Project Structure
voice-bot/
├── public/
│   └── index.html        # Main application file
├── api/
│   └── voicebot.js       # Serverless function for API calls
├── .env                  # Environment variables (not committed)
├── .gitignore            # Git ignore file
├── package.json          # Project metadata and dependencies
├── README.md             # Project documentation
└── vercel.json           # Vercel configuration

Setup for Local Testing

Clone the Repository:
git clone <repository-url>
cd voice-bot


Install Dependencies:
npm install


Set Up Environment Variables:

Create a .env file in the root directory with the following:GITHUB_AI_TOKEN=<your-github-ai-token>
AZURE_TTS_KEY=<your-azure-tts-key>


Replace <your-github-ai-token> and <your-azure-tts-key> with your actual API keys. The SYSTEM_PROMPT should contain the persona details for the AI.


Install Vercel CLI:
npm install -g vercel


Run Locally:
vercel dev


Open http://localhost:3000 in Chrome or Edge to test the app.
Test voice input, text input, and voice output. Ensure the bot responds correctly to sample questions.



Deployment to Vercel

Push to GitHub:

Initialize a Git repository:git init
git add .
git commit -m "Initial commit"


Create a repository on GitHub and push:git remote add origin <repository-url>
git push -u origin main




Deploy to Vercel:

Log in to Vercel:vercel login


Deploy the project:vercel


Follow prompts to configure the project.
Set environment variables in Vercel dashboard (Settings > Environment Variables):
GITHUB_AI_TOKEN
AZURE_TTS_KEY



Access the deployed app at the provided Vercel URL (e.g., https://voice-bot.vercel.app).





Usage

Voice Input: Click "Ask via Voice" and speak your question (requires Chrome or Edge).
Text Input: Type a question in the input field and click "Send" or press Enter.
Sample Questions: Click on example questions to test the bot.
Stop Speaking: Click "Stop Speaking" to interrupt voice responses.
Clear Chat: Click "Clear Chat" to reset the conversation.

Troubleshooting

Speech Recognition Issues: Ensure you're using Chrome or Edge. Check microphone permissions.
API Errors: Verify environment variables are correctly set in .env (local) or Vercel dashboard (production).
Vercel Logs: Use vercel logs or the Vercel dashboard to debug serverless function issues.

