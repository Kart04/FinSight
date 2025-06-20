// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCfl2j1bRC6Hr3QIdhpiptUQSyX5xU-Ehg",
//   authDomain: "finsight-4c2d6.firebaseapp.com",
//   projectId: "finsight-4c2d6",
//   storageBucket: "finsight-4c2d6.firebasestorage.app",
//   messagingSenderId: "1090241589295",
//   appId: "1:1090241589295:web:8cfcd86c5c489a0033d6da",
//   measurementId: "G-6XD349BTWL"  
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfl2j1bRC6Hr3QIdhpiptUQSyX5xU-Ehg",
  authDomain: "finsight-4c2d6.firebaseapp.com",
  projectId: "finsight-4c2d6",
  storageBucket: "finsight-4c2d6.firebasestorage.app",
  messagingSenderId: "1090241589295",
  appId: "1:1090241589295:web:8cfcd86c5c489a0033d6da",
  measurementId: "G-6XD349BTWL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
