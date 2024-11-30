// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'your_firebase_api_key', // Use your Firebase API key
  authDomain: 'your_firebase_project_id.firebaseapp.com',
  projectId: 'your_firebase_project_id',
  storageBucket: 'your_firebase_project_id.appspot.com',
  messagingSenderId: 'your_firebase_sender_id',
  appId: 'your_firebase_app_id',
  measurementId: 'your_firebase_measurement_id'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export services
export { auth, db, analytics };