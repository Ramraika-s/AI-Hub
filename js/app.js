document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const inputField = document.getElementById('user-input');
  const outputField = document.getElementById('model-output');
  const modelButtons = document.querySelectorAll('.model-button');
  const form = document.getElementById('data-form');

  // Hugging Face API configuration
  const HUGGING_FACE_API_KEY = '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';  // Hugging Face API Key
  const API_URL = 'https://api-inference.huggingface.co/models/';  // Hugging Face API URL

  // Firebase configuration (already initialized elsewhere in your project)
  // For example:
  // firebase.initializeApp(firebaseConfig);

  // Model selection - Trigger model call on button click
  modelButtons.forEach(button => {
      button.addEventListener('click', function () {
          const modelName = button.innerText.trim();
          if (inputField.value.trim() !== '') {
              callHuggingFaceAPI(modelName, inputField.value);
          } else {
              outputField.innerText = 'Enter a text before selecting a model.';
          }
      });
  });

  // Function to call Hugging Face API and get output from the selected model
  async function callHuggingFaceAPI(modelName, inputText) {
      const endpoint = '${API_URL}${modelName}';
      const headers = {
          'Authorization': 'Bearer ${HUGGING_FACE_API_KEY}',
          'Content-Type': 'application/json'
      };
      const body = JSON.stringify({ inputs: inputText });

      try {
          outputField.innerText = 'Processing... Please wait.';

          const response = await fetch(endpoint, {
              method: 'POST',
              headers: headers,
              body: body
          });

          const data = await response.json();
          if (response.ok) {
              outputField.innerText = data.generated_text || 'No output from model.';
          } else {
              outputField.innerText = "Error: ${data.error.message || 'Unknown error occurred.'}";
          }
      } catch (error) {
          console.error('Error:', error);
          outputField.innerText = 'Network error: ${error.message}';
      }
  }

  // Event to clear output field while typing
  function clearOutput() {
      outputField.innerText = '';
  }

  inputField.addEventListener('input', clearOutput);

  // Form submission to save input data
  if (form) {
      form.addEventListener('submit', function (event) {
          event.preventDefault();
          const userInput = inputField.value.trim();
          if (userInput) {
              saveUserInput(userInput);
          } else {
              alert('Please enter some text before submitting.');
          }
      });
  }

  // Save user input to Firebase Firestore (expand if needed)
  function saveUserInput(input) {
      // Initialize Firebase (Firebase configuration)
      const firebaseConfig = {
          apiKey: "AIzaSyCl7PnoVlHFWdPJqLDdIYxXCXGAk8plDxI",
          authDomain: "aihub-services.firebaseapp.com",
          projectId: "aihub-services",
          storageBucket: "aihub-services.appspot.com",
          messagingSenderId: "544621705118",
          appId: "1:544621705118:web:56c9fe6e29acb54271e8fb",
          measurementId: "G-JPZTWM3MTP"
      };

      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
      } else {
          firebase.app(); // If already initialized, use that one
      }

      const db = firebase.firestore();
      db.collection("user_inputs")
          .add({
              input: input,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(() => {
              console.log('User input saved successfully!');
          })
          .catch((error) => {
              console.error('Error saving user input: ', error);
          });
    }
});