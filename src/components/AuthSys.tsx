import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, signInWithPopup, GithubAuthProvider, GoogleAuthProvider, Auth } from 'firebase/auth';
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../firebase-config";

// Initialize Firebase
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
    <div className="h-[86vh] w-full flex justify-center items-center flex-col">
      <h2 className="text-2xl font-bold">Welcome To <span className="text-transparent transition-all bg-clip-text bg-gradient-to-r from-primaryBlue-primary to-violet-900 ">Novagon Social</span></h2>
      <p className="font-mono">Log In and see what's happening!</p>
      <div className="flex flex-col items-center justify-center p-4 m-3 space-y-4 rounded-lg dark:bg-zinc-600 bg-zinc-300">
      <button onClick={signInAsGuest} className="w-48 h-8 px-4 py-2 text-sm font-bold transition-all rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-500">Sign in as guest</button>
      <button onClick={signInWithGitHub} className="w-48 h-8 px-4 py-2 text-sm font-bold transition-all rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-500">Sign in with GitHub</button>
      <button onClick={signInWithGoogle} className="w-48 h-8 px-4 py-2 text-sm font-bold transition-all rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-500">Sign in with Google</button>
      </div>
    </div>
  );
}


interface SignOutProps {
  auth: Auth;
}

export function SignOut({ auth }: SignOutProps) {
  const [user] = useAuthState(auth);
  if (user) {
    const displayName = user.displayName;
    const photoURL = user.photoURL;
    return (
      <div className="flex justify-center items-center space-x-4 rounded-full bg-zinc-800">
      {displayName == null ? <p className="ml-6">Guest</p> : <p className="ml-6">{displayName}</p>}
      {photoURL && <img className='rounded-full w-9 h-9' src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="pfp" />}
      <button onClick={() => auth.signOut()} className="px-4 py-2 text-sm font-bold rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700">Sign Out</button>
      </div>
    );
  } else {
    return null;
  }
}