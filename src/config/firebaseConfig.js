import { initializeApp } from "firebase/app";
import { getFunctions } from 'firebase/functions';
import { httpsCallable } from "firebase/functions";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyChw2u6fTSUkE9-8-S9me2OpZfYo_sPUrs",
  authDomain: "redapoyoperinatal.firebaseapp.com",
  databaseURL: "https://redapoyoperinatal-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "redapoyoperinatal",
  storageBucket: "redapoyoperinatal.firebasestorage.app",
  messagingSenderId: "5650404269",
  appId: "1:5650404269:web:bfa95404789a870b3c0724",
  measurementId: "G-3BJTQ0K6PQ"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app); 
const storage = getStorage();

export { app, functions, httpsCallable, storage }; 