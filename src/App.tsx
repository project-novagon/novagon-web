import { useAuthState } from "react-firebase-hooks/auth";
import { SignIn, SignOut } from "./components/AuthSys";
import { ImageMenu } from "./components/mainMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatBubbleLeftRightIcon, QuestionMarkCircleIcon, Squares2X2Icon } from "@heroicons/react/24/outline"
import { VideoMenu } from "./components/mainMenu";
import "firebase/firestore";
import "firebase/auth";
import React from "react";
import { TOS } from "./pages/tos";
import { auth, guestPFP } from "./firebase-config";
import { NvgUI } from "./pages/novagon_ui";
import { Profile } from "./pages/profile";
import ChatRoom from "./pages/chat";
import { HomeUI, LandingPage } from "./pages/dashboard";
import { Menu, Transition } from "@headlessui/react";
import { ChatBubbleEmpty, Home, HomeSimple, Iconoir, MediaImage, MediaVideo } from "iconoir-react";
import { SettingsRouter } from "./pages/settings";

console.log("%cStop!",
  "color:red;font-family:'Albert Sans', sans-serif;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold")
console.log("This is a Browser Featuer made for Developers. \nif someone asks you to copy-paste something here, then is its a %c100%",
  "font-weight: 700;",
  "scam."
)

function App() {
  return (
    <div className="flex flex-col-reverse md:flex-col">
      <header className="sticky top-0 w-full px-5 py-0 m-0 bg-white rounded-none sm:rounded-md sm:m-1 dark:bg-mantle">
        <nav className="flex flex-row flex-wrap items-center justify-center w-full py-6 mx-auto sm:justify-between">
          <div className="flex items-center space-x-4">
            <img src="https://novagoncdn.netlify.app/logo/nvgweb/Novagon%20Web%403x.png" alt="Novagon Logo" className="hidden w-16 rounded-xl sm:block" />
            <h2 className="hidden text-2xl md:block">Novagon Web</h2>
          </div>
          <div className="flex flex-row space-x-4">
            <a href="/"><HomeSimple className="w-8 h-8 m-0 "/></a>
            <a href="/chat"><ChatBubbleEmpty className="w-8 h-8 m-0 "/></a>
            <a href="/videos"><MediaVideo className="w-8 h-8 m-0 "/></a>
            <a href="/images"><MediaImage className="w-8 h-8 m-0 "/></a>
            <a href="/profile"><img src={guestPFP} alt="" className="block w-8 h-8 rounded-full sm:hidden"/></a>
          </div>
          <div className="items-center justify-center hidden gap-2 sm:flex ">
            <SignOut auth={auth} />
          </div>
        </nav>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/images" element={<ImageUI />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/wip" element={<WorkInProgress />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/tos" element={<TOS />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/profile" element={<ProfileInit />} />
          <Route path="/chat" element={<ChatUI />} />
          <Route path="/settings" element={<SettingsRouter/>} />
          <Route path="/" element={<HomeUI />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ImageUI() {
  const [user] = useAuthState(auth);

  return (
    <>
      <section className="p-0 md:p-6">
        {user ? <ImageMenu user={user} /> : <SignIn />}
      </section>
    </>
  );
}

function ChatUI() {
  const [user] = useAuthState(auth);

  return (
    <>
      <section className="p-0 md:p-6">
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </>
  );
}

function ProfileInit() {
  const [user] = useAuthState(auth);

  return (
    <>
      <section className="p-0 md:p-6">
        {user ? <Profile /> : <SignIn />}
      </section>
    </>
  );
}
function Videos() {
  const [user] = useAuthState(auth);
  return (
    <>
      <section className="p-0 md:p-6">
        {user ? <VideoUI /> : <SignIn />}
      </section>
    </>
  );
}
function VideoUI() {
  const [user] = useAuthState(auth);

  return (
    <>
      <section className="p-0 md:p-6">
        {user ? <VideoMenu user={user} /> : <SignIn />}
      </section>
    </>
  )
}

function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-3 text-center">
          <div>
            <QuestionMarkCircleIcon className="w-9" />
          </div>
          <div>
            <h1 className="text-4xl font-bold transition-all hover:text-mauve">404</h1>
            <p>Not Found</p>
            <a href="/" className="transition hover:underline text-mauve">Go Back</a>
          </div>
        </div>
      </div>
    </>
  )
}
function WorkInProgress() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-3 text-center">
          <div>
            <QuestionMarkCircleIcon className="w-9" />
          </div>
          <div>
            <h1 className="text-4xl font-bold transition-all hover:text-mauve">501</h1>
            <p>Work in progress</p>
            <a href="/" className="transition hover:underline text-mauve">Go Back</a>
          </div>
        </div>
      </div>
    </>
  )
}
function Maintenance() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-3 text-center">
          <div>
            <QuestionMarkCircleIcon className="w-9" />
          </div>
          <div>
            <h1 className="text-4xl font-bold transition-all hover:text-mauve">503</h1>
            <p>Hey There! Novagon Web is temporarely down for maintenance.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
function useState(): [any, any] {
  throw new Error("Function not implemented.");
}

function usePopper(referenceElement: any, popperElement: any): { styles: any; attributes: any; } {
  throw new Error("Function not implemented.");
}

