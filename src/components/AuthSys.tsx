import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
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

export function SignIn() {
  const signInAsGuest = () => {
    signInAnonymously(auth)
      .then(() => {
        console.log('Signed in as guest');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const signInWithGitHub = () => {
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // GitHub sign-in successful
        const user = result.user;
        console.log('Signed in as', user.displayName);
      })
      .catch((error) => {
        // An error occurred during sign-in
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // GitHub sign-in successful
        const user = result.user;
        console.log('Signed in as', user.displayName);
      })
      .catch((error) => {
        // An error occurred during sign-in
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="h-[90vh] w-full flex justify-center items-center flex-col">
      <h2 className="text-2xl">Welcome To <span className="text-transparent transition-all bg-clip-text bg-gradient-to-r from-primaryBlue-primary to-violet-900 ">Novagon Social</span></h2>
      <p className="font-bold">Log In and see what's happening!</p>
      <div className="flex flex-col items-center justify-center p-4 m-3 rounded-md bg-zinc-500">
      <button onClick={signInAsGuest} className="w-48 h-8 px-4 py-2 text-sm font-bold transition-all rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-600">Sign in as guest</button>
      <button onClick={signInWithGitHub} className="w-48 h-8 px-4 py-2 text-sm font-bold transition-all rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-600">Sign in with GitHub</button>
      <button onClick={signInWithGoogle} className="w-48 h-8 px-4 py-2 text-sm font-bold transition-all rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-600">Sign in with Google</button>
      </div>
    </div>
  );
}

export function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()} className="px-4 py-2 text-sm font-bold rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700">Sign Out</button>
  );
}