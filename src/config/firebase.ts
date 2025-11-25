// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLhGlh_Taw-aRI7vEQBEzkzrjeuAKUxNc",
  authDomain: "stf-web-34a3b.firebaseapp.com",
  projectId: "stf-web-34a3b",
  storageBucket: "stf-web-34a3b.firebasestorage.app",
  messagingSenderId: "311427704953",
  appId: "1:311427704953:web:a93b0b28026b4d140b0ca8",
  measurementId: "G-79FBF73WJM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);