import { signInAnonymously, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from "../firebase-config";
import { Cancel, GithubCircle, GoogleCircle, UserCircle } from 'iconoir-react';
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
      <div className="md:h-[86vh] h-[90vh] w-full flex justify-center md:items-center  items-end flex-col bg-nw-login bg-cover">
          <div className="inline-flex flex-col items-center justify-center w-full h-screen gap-8 p-12 rounded-none shadow-lg md:w-96 md:h-80 bg-base bg-subtext backdrop-blur-lg md:rounded-2xl">
            <h2 className="text-2xl leading-tight text-center text-white before:content-more-than">Sign In</h2>
            <div className="p-[0px] flex-col justify-center items-center gap-4 flex">
              <button className="sign-in-btn button-secondary" onClick={signInAsGuest}>
                <UserCircle className="w-6 h-6" />
                Try Novagon Web
              </button>
              <button className="sign-in-btn button-secondary" onClick={signInWithGitHub}>
                <GithubCircle className='w-6 h-6'/>
                Sign in with GitHub
              </button>
              <button className="sign-in-btn button-secondary" onClick={signInWithGoogle}>
                <GoogleCircle className='w-6 h-6'/>
                Sign in with Google
              </button>
            </div>
            <div className="p-[0px] flex-col justify-start items-start gap-[10px] flex">
            </div>
          </div>

      </div>
    </>
  );
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
        <div className="flex items-center justify-between p-2 space-x-16 rounded-full bg-base">
          <h2 className="self-center ml-2 text-2xl font-bold">Account Banned</h2>
          <button onClick={onClose} className="transition-all hover:text-mauve">
            <Cancel className='w-8 h-8'/>
          </button>
        </div>
        <div className="p-4 bg-base rounded-3xl">
          <p>Hello. Your account has been banned.</p>
          <p>Reason: Unknown.</p>
          <p>If you think its a mistake, or have any questions, <a href="mailto:contactnovagon@gmail.com" className="underline text-mauve">Contact Us.</a></p>
        </div>
      </div>
    </div>
  );
}