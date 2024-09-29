// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//console.log(import.meta.env.VITE_FIREBASE_API_KEY)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "agricredit-4444.firebaseapp.com",
  projectId: "agricredit-4444",
  storageBucket: "agricredit-4444.appspot.com",
  messagingSenderId: "271052229369",
  appId: "1:271052229369:web:be2bd6f457e38668453028",
  measurementId: "G-V3DWEFGP72",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
