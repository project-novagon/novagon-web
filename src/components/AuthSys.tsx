import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from 'firebase/auth';
import React from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyB6YpcLlowvaCVSPUfpxrflvdi1wqzwdDs",
  authDomain: "polygon-social.firebaseapp.com",
  projectId: "polygon-social",
  storageBucket: "polygon-social.appspot.com",
  messagingSenderId: "1040413982197",
  appId: "1:1040413982197:web:d8b8a70509ec88c50274bc",
  measurementId: "G-3L8NZ3JVB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function SignIn(){
    const signInWithAsGuest = () => {
      signInAnonymously(auth)
      .then(() => {
        console.log('Signed in as guest');
    })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
    }
    return (
      <>
      <h2 className="text-2xl">Welcome To Polygon Social</h2>
      <p className="font-bold">Log In and see whats Happening!</p>
      <button onClick={signInWithAsGuest} className="dark:bg-gray-secondary px-4 rounded-full text-primaryBlue-primary font-bold bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm py-2">Sign in as guest</button>
      </>
    )
  }

  export function SignOut() {
    return auth.currentUser && (
      <button  className='dark:bg-gray-secondary px-4 rounded-full text-primaryBlue-primary font-bold bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm py-2' onClick={() => auth.signOut()}>Sign Out</button>
    )
  }