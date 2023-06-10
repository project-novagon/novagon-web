import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyB6YpcLlowvaCVSPUfpxrflvdi1wqzwdDs",
    authDomain: "polygon-social.firebaseapp.com",
    projectId: "polygon-social",
    storageBucket: "polygon-social.appspot.com",
    messagingSenderId: "1040413982197",
    appId: "1:1040413982197:web:c7f53bf7b30f32d00274bc",
    measurementId: "G-W42F1DNVCW"
  };
// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Get Firestore instance
export const db = getFirestore(app);
