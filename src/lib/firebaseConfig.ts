// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTjbxg2FKvTe6Rz2ZHl6TIWhqkJMM9-3o",
  authDomain: "cafecong-94135.firebaseapp.com",
  projectId: "cafecong-94135",
  storageBucket: "cafecong-94135.firebasestorage.app",
  messagingSenderId: "364620004943",
  appId: "1:364620004943:web:12f8a17c22ad1ea469f43a",
  measurementId: "G-DETYVBQBL0",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {
  auth,
  db,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  storage,
};
