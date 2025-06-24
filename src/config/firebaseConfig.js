import { initializeApp } from "firebase/app";
import { getFunctions } from 'firebase/functions';
import { httpsCallable } from "firebase/functions";


const firebaseConfig = {
  apiKey: "AIzaSyAuPGwJQIpTwngSJu80vv0EpcAje1P9VmU",
  authDomain: "gabinete-perinatal.firebaseapp.com",
  databaseURL: "https://gabinete-perinatal-default-rtdb.firebaseio.com",
  projectId: "gabinete-perinatal",
  storageBucket: "gabinete-perinatal.firebasestorage.app",
  messagingSenderId: "222466791048",
  appId: "1:222466791048:web:3b157bb3770b1699ebb13d",
  measurementId: "G-KH6T8W2GV3"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app); 

export { app, functions, httpsCallable }; 