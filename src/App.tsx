import { useAuthState } from 'react-firebase-hooks/auth';
import { SignIn, SignOut } from './components/AuthSys';
import { MainMenu } from './components/MainMenu';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/auth';
import React from 'react';
import './App.css';

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
const analytics = getAnalytics(app);
const auth = getAuth();

function App() {
  const [user] = useAuthState(auth);
  return (
        <div className="">
          <header>
            <h1 className="text-3xl font-bold font-albertsans text-zinc-400">Polygon Social</h1>
            <SignOut/>
          </header>

          <section className='p-6'>
            {user ? <MainMenu user={user}/> : <SignIn/>}
          </section>
        </div>
  );
}

export default App;