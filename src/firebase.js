// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Remove the next line if you don't need analytics
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// Replace with your config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyC7DFk4i5nAyyL-YrftLjF52DgARtyE27s",
  authDomain: "finsight-67b1e.firebaseapp.com",
  projectId: "finsight-67b1e",
  storageBucket: "finsight-67b1e.firebasestorage.app",
  messagingSenderId: "254541085370",
  appId: "1:254541085370:web:b403037c77f115303a6083",
  measurementId: "G-TTX1NWSQNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and db for use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only if you need it
export const analytics = getAnalytics(app);
