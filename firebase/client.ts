// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";

import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getAnalytics} from "@firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsEoHvBuXluXmhW-Y8OyUsnXk_EStwARk",
    authDomain: "prepai-5c1ce.firebaseapp.com",
    projectId: "prepai-5c1ce",
    storageBucket: "prepai-5c1ce.firebasestorage.app",
    messagingSenderId: "174813218170",
    appId: "1:174813218170:web:75e4fcfe4bdc2f9fe882c3",
    measurementId: "G-363PQG62SP"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

