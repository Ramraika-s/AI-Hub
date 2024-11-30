// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { HfInference } from '@huggingface/inference';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl7PnoVlHFWdPJqLDdIYxXCXGAk8plDxI", // Use your Firebase API key
  authDomain: 'aihub-services.firebaseapp.com',
  projectId: 'aihub-services',
  storageBucket: 'aihub-services.appspot.com',
  messagingSenderId: '544621705118',
  appId: "1:544621705118:web:9a3d02ed2a2c632a37bc68",
  measurementId: 'G-JPZTWM3MTP'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Hugging Face API Setup
const hf = new HfInference("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");

// Authentication and Firestore Setup
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User Registered:', userCredential.user);
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User Logged In:', userCredential.user);
  } catch (error) {
    console.error('Error logging in user:', error);
  }
};

// Hugging Face Inference Function Example
const getTextGeneration = async (text) => {
  try {
    const output = await hf.textGeneration({
      model: 'gpt2',  // Example model, change as per selection
      inputs: text,
    });
    console.log('Generated Text:', output.generated_text);
    return output.generated_text;
  } catch (error) {
    console.error('Error with text generation:', error);
  }
};

// Handling User Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in:', user);
  } else {
    console.log('No user signed in');
  }
});

// Example of storing data in Firestore (User feedback, queries, etc.)
const storeUserData = async (userData) => {
  try {
    await addDoc(collection(db, 'userQueries'), {
      name: userData.name,
      query: userData.query,
      timestamp: new Date(),
    });
    console.log('User data stored');
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

// Initialize functions and connect UI
document.getElementById('register-btn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  registerUser(email, password);
});

document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  loginUser(email, password);
});

document.getElementById('generate-btn').addEventListener('click', async () => {
  const inputText = document.getElementById('input-text').value;
  const result = await getTextGeneration(inputText);
  document.getElementById('generated-text').innerText = result;
});

// Google Analytics Event Tracking
const trackEvent = (eventName, eventParams) => {
  analytics.logEvent(eventName, eventParams);
};