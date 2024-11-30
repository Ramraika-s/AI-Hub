// huggingface-api.js
import { HfInference } from '@huggingface/inference';

// Set Hugging Face API access token
const hf = new HfInference('your_huggingface_access_token');

// Example function for text generation
const getTextGeneration = async (inputText) => {
  try {
    const output = await hf.textGeneration({
      model: 'gpt2', // You can change this based on the model selected
      inputs: inputText,
    });
    return output.generated_text;
  } catch (error) {
    console.error('Error generating text:', error);
  }
};

// Export function for external use
export { getTextGeneration };