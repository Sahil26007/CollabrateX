// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "collabratex-53b52.firebaseapp.com",
  projectId: "collabratex-53b52",
  storageBucket: "collabratex-53b52.appspot.com",
  messagingSenderId: "562797810747",
  appId: "1:562797810747:web:1c64aa292297d5d0daf81e",
  measurementId: "G-PLNJ47Z150"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);
