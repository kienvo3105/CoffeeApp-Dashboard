// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyALA6rpS1-Vu0FR_kiTk_Supl3oZitJaEc",
    authDomain: "coffeeapp-396609.firebaseapp.com",
    projectId: "coffeeapp-396609",
    storageBucket: "coffeeapp-396609.appspot.com",
    messagingSenderId: "704924689693",
    appId: "1:704924689693:web:5cb4d57f3b932cf8fc2df4",
    measurementId: "G-V2SE97PGKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);