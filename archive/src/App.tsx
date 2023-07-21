import { useAuthState } from "react-firebase-hooks/auth";
import { SignIn, SignOut } from "./components/AuthSys";
import { ImageMenu } from "./components/mainMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatBubbleLeftRightIcon, ChevronDownIcon, HomeIcon, PhotoIcon, QuestionMarkCircleIcon, Squares2X2Icon, VideoCameraIcon } from "@heroicons/react/24/solid"
import { VideoMenu } from "./components/mainMenu";
import "firebase/firestore";
import "firebase/auth";
import React, { Fragment } from "react";
import { TOS } from "./pages/tos";
import { auth, guestPFP } from "./firebase-config";
import { NvgUI } from "./pages/novagon_ui";
import { Profile } from "./pages/profile";
import ChatRoom from "./pages/chat";
import { HomeUI, LandingPage } from "./pages/dashboard";
import { Menu, Transition } from "@headlessui/react";
import { getAuth } from "firebase/auth";
import { SignInSection } from "./components/ui/signinsection";

console.log("%cStop!",
  "color:red;font-family:'Albert Sans', sans-serif;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold")
console.log("This is a Browser Feature made for Developers. \nif someone asks you to copy-paste something here, then is its a %c100%",
  "font-weight: 700;",
  "scam."
)

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="flex flex-col-reverse sm:flex-col">
      <header className="fixed w-full px-5 py-0 bg-white dark:bg-zinc-900 sm:relative">
        <nav className="flex flex-row flex-wrap items-center justify-center w-full py-6 mx-auto sm:justify-between">
          <div className="flex items-center space-x-4">
            <img src="https://novagoncdn.netlify.app/logo/nvgweb/Novagon%20Web%403x.png" alt="Novagon Logo" className="hidden w-16 rounded-xl sm:block" />
            <h2 className="hidden text-2xl lg:block">Novagon Web</h2><p className="hidden px-4 uppercase rounded dark:bg-zinc-700 md:block bg-zinc-300">DEV</p>
          </div>
          <div className="hidden space-x-3 sm:block">
            <a href="/">Home</a>
            <a href="/chat">Chat</a>
            <a href="/videos">Videos</a>
            <a href="/images">Images</a>
          </div>
          <div className="flex items-center justify-center hidden gap-2 sm:block">
            <SignOut auth={auth} />
          </div>
          <div className="flex block gap-4 sm:hidden">
            <a href="/">
              <HomeIcon className="w-9"/>
            </a>
            <a href="/chat">
              <ChatBubbleLeftRightIcon className="w-9" />
            </a>
            <a href="/profile">
                <img src={user?.photoURL ? user.photoURL : guestPFP} alt="Profile" className="rounded-full w-9"/>
            </a>
            <a href="/images">
                <PhotoIcon className="w-9" />
            </a>
            <a href="/videos">
              <VideoCameraIcon className="w-9" />
            </a>
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
          <Route path="/ui" element={<NvgUI />} />
          <Route path="/profile" element={<ProfileInit />} />
          <Route path="/chat" element={<ChatUI />} />
          <Route path="/home" element={<SignInSection className="p-0 md:p-6" />} />
          <Route path="/" element={<LandingPage />} />
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
            <h1 className="text-4xl font-bold transition-all hover:text-violet-500">404</h1>
            <p>Not Found</p>
            <a href="/" className="text-violet-500 transition hover:underline">Go Back</a>
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
            <h1 className="text-4xl font-bold transition-all hover:text-violet-500">501</h1>
            <p>Work in progress</p>
            <a href="/" className="text-violet-500 transition hover:underline">Go Back</a>
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
            <h1 className="text-4xl font-bold transition-all hover:text-violet-500">503</h1>
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

