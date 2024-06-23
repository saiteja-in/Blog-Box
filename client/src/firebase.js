// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogboxd.firebaseapp.com",
  projectId: "blogboxd",
  storageBucket: "blogboxd.appspot.com",
  messagingSenderId: "779785293878",
  appId: "1:779785293878:web:8c2f9fc62f133f1d280897"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);