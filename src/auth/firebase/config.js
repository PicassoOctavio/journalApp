// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBme3ChhfJgXNX7eFQO6bOTEBU3XOZ9u9g",
  authDomain: "react-curso-59a45.firebaseapp.com",
  projectId: "react-curso-59a45",
  storageBucket: "react-curso-59a45.appspot.com",
  messagingSenderId: "939342429299",
  appId: "1:939342429299:web:ed9db3a42ff117ae49fe06"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp ); 

export const FirebaseDB = getFirestore( FirebaseApp );
