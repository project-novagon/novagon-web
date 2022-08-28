import { useAuthState } from "react-firebase-hooks/auth";
import { SignIn, SignOut } from "./components/AuthSys";
import { MainMenu } from "./components/MainMenu";
import { initializeApp } from "firebase/app";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import "firebase/auth";
import React from "react";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyB6YpcLlowvaCVSPUfpxrflvdi1wqzwdDs",
  authDomain: "polygon-social.firebaseapp.com",
  projectId: "polygon-social",
  storageBucket: "polygon-social.appspot.com",
  messagingSenderId: "1040413982197",
  appId: "1:1040413982197:web:d8b8a70509ec88c50274bc",
  measurementId: "G-3L8NZ3JVB5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  return (
    <>
      <header className="flex space-x-8">
        <h1 className="text-3xl font-bold font-albertsans text-zinc-400">
          Novagon Social
        </h1>
        <SignOut />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Home() {
  const [user] = useAuthState(auth);

  return (
    <>
      <section className="p-6">
        {user ? <MainMenu user={user} /> : <SignIn />}
      </section>
    </>
  );
}
function Videos() {
  const [user] = useAuthState(auth);
  return (
    <>
      <section className="p-6">
        {user ? <VideoUI /> : <SignIn />}
      </section>
    </>
  );
}


function VideoUI() {
  return (
    <>
      <h1 className="text-2xl font-bold transition-all hover:text-primaryBlue-primary">WIP</h1>
      <p>We're working on it!</p>
      <a href="/" className="transition hover:underline text-primaryBlue-primary">Go Back</a>
    </>
  )
}
export default App;
