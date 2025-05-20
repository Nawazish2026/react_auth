// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIz61Uggi3FIlsjms5wb6p5EfisrYBn0c",
  authDomain: "reactauth-21b58.firebaseapp.com",
  projectId: "reactauth-21b58",
  storageBucket: "reactauth-21b58.firebasestorage.app",
  messagingSenderId: "818371669357",
  appId: "1:818371669357:web:bd6a382e0e09060bc3be64",
  measurementId: "G-BQZ5DNN2WV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };