import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, signInWithPopup, GithubAuthProvider, GoogleAuthProvider, Auth } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../firebase-config";
import { auth } from "../firebase-config";

// Initialize Firebase

export function SignIn() {
  const [isBanned, setIsBanned] = useState(false);
  const signInAsGuest = () => {
    signInAnonymously(auth)
      .then(() => {
        console.log('Signed in as guest');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/user-disabled") {
          setIsBanned(true);
        } else {
          console.log(errorCode, errorMessage);
        }
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
        if (errorCode === "auth/user-disabled") {
          setIsBanned(true);
        } else {
          console.log(errorCode, errorMessage);
        }
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
        if (errorCode === "auth/user-disabled") {
          setIsBanned(true);
        } else {
          console.log(errorCode, errorMessage);
        }
      });
  };

  return (
    <>
    {isBanned && <BannedPopup isBanned={isBanned} onClose={() => setIsBanned(false)} />}
    <div className="h-[86vh] w-full flex justify-center items-center flex-col">
      <h2 className="text-2xl font-bold">Welcome To <span className="text-transparent transition-all bg-clip-text bg-gradient-to-r from-primaryBlue-primary to-violet-900 ">Novagon Web</span></h2>
      <p className="font-mono">Log In and see what's happening!</p>
      <div className="flex flex-col items-center justify-center p-4 m-3 space-y-4 rounded-lg dark:bg-zinc-600 bg-zinc-300">
        <button onClick={signInAsGuest} className="w-48 h-8 px-4 py-2 text-sm font-bold transition-all rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-500">Sign in as guest</button>
        <button onClick={signInWithGitHub} className="w-48 h-8 px-4 py-2 text-sm font-bold transition-all rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-500">Sign in with GitHub</button>
        <button onClick={signInWithGoogle} className="w-48 h-8 px-4 py-2 text-sm font-bold transition-all rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-500">Sign in with Google</button>
      </div>
      <p>By logging in, you automatically agree to the <a href="./tos" className="underline">ToS (Terms of Service)</a>.</p>
    </div>
    </>
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
      <div className="flex items-center justify-center space-x-4 rounded-full dark:bg-zinc-800 bg-zinc-300">
        {displayName == null ? <p className="ml-6">Guest</p> : <p className="ml-6">{displayName}</p>}
        {photoURL && <img className='rounded-full w-9 h-9' src={photoURL || 'https://novagoncdn.netlify.app/img/guest_pfp.png'} alt="pfp" />}
        <button onClick={() => auth.signOut()} className="px-4 py-2 text-sm font-bold rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700">Sign Out</button>
      </div>
    );
  } else {
    return null;
  }
}

interface BannedPopupProps {
  isBanned: boolean;
  onClose: () => void;
}

export function BannedPopup({ isBanned, onClose }: BannedPopupProps) {
  if (!isBanned) {
    return null; // Render nothing if not banned
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex items-end justify-center w-full h-full p-4 bg-black bg-opacity-50 sm:items-center sm:p-0 backdrop-blur-lg">
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 space-x-16 rounded-full dark:bg-zinc-800 bg-zinc-300">
        <h2 className="self-center ml-2 text-2xl font-bold">Account Banned</h2>
          <button onClick={onClose} className="w-16 h-8 text-sm font-bold transition-all rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-500">
            Close
          </button>
        </div>
        <div className="p-4 dark:bg-zinc-800 bg-zinc-300 rounded-3xl">
        <p>Hello. Your account has been banned.</p>
        <p>Reason: Unknown.</p>
        <p>If you think its a mistake, or have any questions, <a href="mailto:contactnovagon@gmail.com" className="underline">Contact Us.</a></p>
        </div>

      </div>
    </div>
  );
}