// Hugging Face API URL
const API_URL = "https://api-inference.huggingface.co/models/";

// Your Hugging Face API token (as provided by you)
const API_TOKEN = "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";

// List of models to be used
const AI_MODELS = {
  "GPT-2": "gpt2",
  "GPT-3-like": "EleutherAI/gpt-neo-2.7B",
  "DistilBERT for Sentiment": "distilbert-base-uncased-finetuned-sst-2-english",
  "BERT for Sentiment": "bert-base-uncased",
  "RoBERTa for QA": "deepset/roberta-base-squad2",
  "ALBERT for QA": "google/albert-xxlarge-v2",
  "Universal Translation to English": "Helsinki-NLP/opus-mt-mul-en",
  "Multi-language Translation": "Helsinki-NLP/opus-mt-en-mul",
  "DALL·E for Image Generation": "dalle-mega-2",
  "Stable Diffusion for Image Generation": "CompVis/stable-diffusion-v1-4",
  "Sentence-BERT for Embeddings": "sentence-transformers/all-MiniLM-L6-v2",
  "Another Sentence-BERT for Embeddings": "sentence-transformers/paraphrase-MiniLM-L3-v2",
  "Codex for Code Generation": "openai/codex",
  "SpaCy NER": "en_core_web_trf",
};

// Function to call Hugging Face API
async function callModel(modelName, inputText) {
  const modelEndpoint = '${API_URL}${modelName}';
  
  try {
    const response = await fetch(modelEndpoint, {
      method: "POST",
      headers: {
        "Authorization": 'Bearer ${API_TOKEN}', // Using the provided API token
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: inputText }), // Sending the user input text to the model
    });

    if (response.ok) {
      const data = await response.json();  // Get JSON response
      displayModelOutput(data);  // Display output from the model
    } else {
      console.error("Error with the API request:", response.statusText);
      alert("Something went wrong! Please try again.");
    }
  } catch (error) {
    console.error("API Error:", error);
    alert("There was an error with the request. Please try again later.");
  }
}

// Function to display the model output
function displayModelOutput(data) {
  const outputDiv = document.getElementById("model-output");
  outputDiv.innerHTML = "";  // Clear any previous output

  // Handling different output types based on the model used
  if (data.length > 0) {
    if (data[0].generated_text) {
      // Text generation models (e.g., GPT-2, GPT-3-like)
      const paragraph = document.createElement("p");
      paragraph.textContent = data[0].generated_text;
      outputDiv.appendChild(paragraph);
    } else if (data[0].translation) {
      // Translation models
      const paragraph = document.createElement("p");
      paragraph.textContent = data[0].translation;
      outputDiv.appendChild(paragraph);
    } else if (data[0].answer) {
      // Question Answering models (e.g., RoBERTa, ALBERT)
      const paragraph = document.createElement("p");
      paragraph.textContent = data[0].answer;
      outputDiv.appendChild(paragraph);
    } else if (data[0].generated_image_url) {
      // Image generation models (e.g., DALL·E, Stable Diffusion)
      const image = document.createElement("img");
      image.src = data[0].generated_image_url;
      outputDiv.appendChild(image);
    } else if (data[0]) {
      // Handle other types of data (e.g., embeddings, etc.)
      const paragraph = document.createElement("p");
      paragraph.textContent = JSON.stringify(data[0], null, 2); // Display JSON for non-text results
      outputDiv.appendChild(paragraph);
    } else {
      const paragraph = document.createElement("p");
      paragraph.textContent = "No output received.";
      outputDiv.appendChild(paragraph);
    }
  }
}

// Event listener for model selection (clicking on model boxes)
document.querySelectorAll(".ai-model-box").forEach(box => {
  box.addEventListener("click", function() {
    const modelName = box.getAttribute("data-model");  // Get model name from the data attribute
    const inputText = document.getElementById("user-input").value;  // Get the user input text
    if (inputText) {
      callModel(AI_MODELS[modelName], inputText);  // Call model API with input text
    } else {
      alert("Please enter some text to interact with the model.");
    }
  });
});