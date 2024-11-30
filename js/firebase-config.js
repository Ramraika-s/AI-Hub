// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCl7PnoVlHFWdPJqLDdIYxXCXGAk8plDxI', // Use your Firebase API key
  authDomain: 'aihub-services.firebaseapp.com',
  projectId: 'aihub-services',
  storageBucket: 'aihub-services.appspot.com',
  messagingSenderId: '544621705118',
  appId: "1:544621705118:web:9a3d02ed2a2c632a37bc68",
  measurementId: 'G-JPZTWM3MTP'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Firebase Authentication
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);  // Firebase Storage (for file storage)

// Export services
export { auth, db, analytics };