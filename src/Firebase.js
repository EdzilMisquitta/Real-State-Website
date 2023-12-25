// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlZxEpmCeb7lsRCnbb9qw3CGjUQQ-mOYA",
  authDomain: "final-year-project-d29df.firebaseapp.com",
  projectId: "final-year-project-d29df",
  storageBucket: "final-year-project-d29df.appspot.com",
  messagingSenderId: "393469460203",
  appId: "1:393469460203:web:1401f23f10d6b909c908ae",
  measurementId: "G-MYEC6G3606"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()