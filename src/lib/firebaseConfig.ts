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

// Config 2 - App phụ
const firebaseConfig2 = {
  apiKey: "AIzaSyBTjPH-Bt4Bgtdy0PRIhuRXmEgtMSOb4JY",
  authDomain: "congcafedb.firebaseapp.com",
  projectId: "congcafedb",
  storageBucket: "congcafedb.firebasestorage.app",
  messagingSenderId: "1066166529717",
  appId: "1:1066166529717:web:7c2e0c69346b43ce0a58fc",
  measurementId: "G-RKSRC165BP",
};
const firebaseConfig = {
  apiKey: "AIzaSyCTjbxg2FKvTe6Rz2ZHl6TIWhqkJMM9-3o",
  authDomain: "cafecong-94135.firebaseapp.com",
  projectId: "cafecong-94135",
  storageBucket: "cafecong-94135.firebasestorage.app",
  messagingSenderId: "364620004943",
  appId: "1:364620004943:web:12f8a17c22ad1ea469f43a",
  measurementId: "G-DETYVBQBL0",
};
//
// Khởi tạo 2 app Firebase khác nhau
export const app1 = initializeApp(firebaseConfig, "app1");
export const app2 = initializeApp(firebaseConfig2, "app2");

// Tạo Firestore và Storage riêng biệt
export const db1 = getFirestore(app1);
export const db2 = getFirestore(app2);

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
