// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpKNpX9axJhhtD-MfFvXJbVBf2Ui0nboo",
  authDomain: "fir-test-1b586.firebaseapp.com",
  projectId: "fir-test-1b586",
  storageBucket: "fir-test-1b586.appspot.com",
  messagingSenderId: "368791690403",
  appId: "1:368791690403:web:df2278dc370006b3bc3316",
  measurementId: "G-29G6Q3R77M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);