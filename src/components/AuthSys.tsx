import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, signInWithPopup, GithubAuthProvider, GoogleAuthProvider, Auth } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../firebase-config";
import { auth } from "../firebase-config";
import { UserIcon } from "@heroicons/react/24/outline";
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
  const [toggleAccountUsage, setAccountUsage] = useState(false);
  return (
    <>
      {isBanned && <BannedPopup isBanned={isBanned} onClose={() => setIsBanned(false)} />}
      {toggleAccountUsage === false ?
        <div className="md:h-[86vh] h-[90vh] w-full flex justify-center md:items-center  items-end flex-col bg-gradient-to-bl from-primaryBlue-primary to-violet-900 rounded-lg">
          <div className="md:w-96 md:h-80 h-screen w-full px-12 py-8 bg-zinc-600 md:rounded-lg rounded-none shadow flex-col justify-center items-center gap-8 inline-flex">
            <h1 className="text-center text-white text-[24px] font-bold leading-tight">Sign In</h1>
            <div className="p-[0px] flex-col justify-center items-center gap-4 flex">
              <button className="self-stretch px-4 py-2 bg-neutral-700 rounded-full justify-center items-center gap-2 inline-flex" onClick={signInAsGuest}>
                <UserIcon className="w-6 h-6 relative" />
                <div className="text-center text-sky-500 text-[14px] font-bold leading-tight">Sign in as guest</div>
              </button>
              <button className="self-stretch px-4 py-2 bg-neutral-700 rounded-full justify-center items-center gap-2 inline-flex" onClick={signInWithGitHub}>
                <div className="w-6 h-6 relative" >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="github-mark-white 1" clip-path="url(#clip0_143_90)">
                      <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11.9642 0C5.34833 0 0 5.5 0 12.3042C0 17.7432 3.42686 22.3472 8.18082 23.9767C8.77518 24.0992 8.9929 23.712 8.9929 23.3862C8.9929 23.101 8.97331 22.1232 8.97331 21.1045C5.64514 21.838 4.95208 19.6378 4.95208 19.6378C4.41722 18.2118 3.62473 17.8452 3.62473 17.8452C2.53543 17.0915 3.70408 17.0915 3.70408 17.0915C4.91241 17.173 5.54645 18.3545 5.54645 18.3545C6.61592 20.2285 8.33927 19.699 9.03257 19.373C9.13151 18.5785 9.44865 18.0285 9.78539 17.723C7.13094 17.4377 4.33812 16.3785 4.33812 11.6523C4.33812 10.3078 4.81322 9.20775 5.56604 8.35225C5.44727 8.04675 5.03118 6.7835 5.68506 5.09275C5.68506 5.09275 6.69527 4.76675 8.97306 6.35575C9.94827 6.08642 10.954 5.9494 11.9642 5.94825C12.9744 5.94825 14.0042 6.091 14.9552 6.35575C17.2332 4.76675 18.2434 5.09275 18.2434 5.09275C18.8973 6.7835 18.481 8.04675 18.3622 8.35225C19.1349 9.20775 19.5904 10.3078 19.5904 11.6523C19.5904 16.3785 16.7976 17.4172 14.1233 17.723C14.5592 18.11 14.9353 18.8432 14.9353 20.0045C14.9353 21.6545 14.9158 22.9787 14.9158 23.386C14.9158 23.712 15.1337 24.0992 15.7278 23.977C20.4818 22.347 23.9087 17.7432 23.9087 12.3042C23.9282 5.5 18.5603 0 11.9642 0Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_143_90">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                </div>
                <div className="text-center text-sky-500 text-[14px] font-bold leading-tight">Sign in with GitHub</div>
              </button>
              <button className="self-stretch px-4 py-2 bg-neutral-700 rounded-full justify-center items-center gap-2 inline-flex" onClick={signInWithGoogle}>
                <div className="w-6 h-6 relative">
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Google Icon" clip-path="url(#clip0_143_114)">
                      <g id="Group">
                        <path id="Vector" d="M24.2449 12.27C24.2449 11.48 24.1749 10.73 24.0549 10H12.7549V14.51H19.2249C18.9349 15.99 18.0849 17.24 16.8249 18.09V21.09H20.6849C22.9449 19 24.2449 15.92 24.2449 12.27Z" fill="#4285F4" />
                        <path id="Vector_2" d="M12.7549 24C15.9949 24 18.7049 22.92 20.6849 21.09L16.8249 18.09C15.7449 18.81 14.3749 19.25 12.7549 19.25C9.62492 19.25 6.97492 17.14 6.02492 14.29H2.04492V17.38C4.01492 21.3 8.06492 24 12.7549 24Z" fill="#34A853" />
                        <path id="Vector_3" d="M6.02488 14.29C5.77488 13.57 5.64488 12.8 5.64488 12C5.64488 11.2 5.78488 10.43 6.02488 9.71V6.62H2.04488C1.22488 8.24 0.754883 10.06 0.754883 12C0.754883 13.94 1.22488 15.76 2.04488 17.38L6.02488 14.29Z" fill="#FBBC05" />
                        <path id="Vector_4" d="M12.7549 4.75C14.5249 4.75 16.1049 5.36 17.3549 6.55L20.7749 3.13C18.7049 1.19 15.9949 0 12.7549 0C8.06492 0 4.01492 2.7 2.04492 6.62L6.02492 9.71C6.97492 6.86 9.62492 4.75 12.7549 4.75Z" fill="#EA4335" />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_143_114">
                        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                      </clipPath>
                    </defs>
                  </svg>

                </div>
                <div className="text-center text-sky-500 text-[14px] font-bold leading-tight">Sign in with Google</div>
              </button>
            </div>
            <div className="p-[0px] flex-col justify-start items-start gap-[10px] flex">
              <p className="text-center">Don't have a account? <button  className="bg-transparent text-black hover:bg-transparent dark:text-white p-0 m-0 hover:text-primaryBlue-primary transition-all underline">Sign Up</button></p>
            </div>
          </div>
        </div>
        :
        <h1>WIP</h1>
      }
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