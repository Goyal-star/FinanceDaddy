const axios = require('axios');

// Replace with your actual API key and external user ID
const apiKey = '7qhSCPl7uifXsMB96CAHglBPrEcOgKUO';
const externalUserId = '66e2e59149f4dc096babeb4d';

// Function to create a chat session
async function createChatSession() {
  try {
    const response = await axios.post(
      'https://api.on-demand.io/chat/v1/sessions',
      {
        pluginIds: [],
        externalUserId: externalUserId
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    return response.data.data.id; // Extract session ID
  } catch (error) {
    console.error('Error creating chat session:', error);
  }
}

// Function to submit a query
async function submitQuery(sessionId) {
  try {
    const response = await axios.post(
      `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
      {
        endpointId: 'predefined-openai-gpt4o',
        query: 'Put your query here',
        pluginIds: ['plugin-1712327325', 'plugin-1713962163', 'plugin-1726226028'],
        responseMode: 'sync'
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    console.log('Query response:', response.data);
  } catch (error) {
    console.error('Error submitting query:', error);
  }
}

// Main function to execute the API calls
async function main() {
  const sessionId = await createChatSession();
  if (sessionId) {
    await submitQuery(sessionId);
  }
}

main();
