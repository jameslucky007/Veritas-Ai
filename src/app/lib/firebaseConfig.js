import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWTPnIyJlEMgJ4rIpzFAe_r5xu1WDPAQs",
  authDomain: "auth-proj-f2e59.firebaseapp.com",
  projectId: "auth-proj-f2e59",
  storageBucket: "auth-proj-f2e59.firebasestorage.app",
  messagingSenderId: "210711980416",
  appId: "1:210711980416:web:0c7bed4d43b6c4705ab965",
  measurementId: "G-DJQNCMKL3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };