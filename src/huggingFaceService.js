
// src/huggingFaceService.js
import axios from 'axios';

const API_URL = 'https://api-inference.huggingface.co/models/gpt2';
const API_TOKEN = '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';

const query = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error querying Hugging Face API:', error);
    return null;
  }
};

export default query;
