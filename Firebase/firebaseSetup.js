// firebaseSetup.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7KWENKucHroYS8b2cZZqi-U43C2k_04I",
    authDomain: "cs5520project-9f604.firebaseapp.com",
    projectId: "cs5520project-9f604",
    storageBucket: "cs5520project-9f604.appspot.com",
    messagingSenderId: "856575372492",
    appId: "1:856575372492:web:ebed356fd31f84f86f6669"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export the database
export const database = getFirestore(app);
