import { useAuthState } from "react-firebase-hooks/auth";
import { SignIn, SignOut } from "./components/AuthSys";
import { ImageMenu } from "./components/mainMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatBubbleLeftRightIcon, QuestionMarkCircleIcon, Squares2X2Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { VideoMenu } from "./components/mainMenu";
import "firebase/firestore";
import "firebase/auth";
import React from "react";
import { TOS } from "./pages/tos";
import { auth } from "./firebase-config";
import { NvgUI } from "./pages/novagon_ui";
import { Profile } from "./pages/profile";
import ChatRoom from "./pages/chat";
import { HomeUI, LandingPage } from "./pages/dashboard";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from 'react'

console.log("%cStop!",
  "color:red;font-family:'Albert Sans', sans-serif;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold")
console.log("This is a Browser Featuer made for Developers. \nif someone asks you to copy-paste something here, then is its a %c100%",
  "font-weight: 700;",
  "scam."
)

function App() {
  return (
    <>
      <header className="px-5 py-0 bg-white dark:bg-zinc-900">
        <nav className="flex flex-row flex-wrap items-center justify-between w-full py-6 mx-auto">
          <div className="flex items-center space-x-4">
            <img src="https://novagoncdn.netlify.app/logo/nvgweb/Novagon%20Web%403x.png" alt="Novagon Logo" className="w-16 rounded-xl" />
            <h2 className="hidden text-2xl md:block">Novagon Web</h2>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Popover>
              <Popover.Button>
                <Squares2X2Icon className="w-8 h-8" />
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative grid grid-cols-1 gap-8 bg-white dark:bg-zinc-700 p-7">
                        <h2 className="text-2xl text-left">Menu</h2>
                        <Popover.Button>
                          <a className="flex items-center justify-center gap-2" href="/chat"><ChatBubbleLeftRightIcon className="w-8 h-8" /> Chat</a>
                        </Popover.Button>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover.Button>
            </Popover>
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
          <Route path="/ui" element={<NvgUI />} />
          <Route path="/profile" element={<ProfileInit />} />
          <Route path="/chat" element={<ChatUI />} />
          <Route path="/home" element={<HomeUI />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
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
            <h1 className="text-4xl font-bold transition-all hover:text-primaryBlue-primary">404</h1>
            <p>Not Found</p>
            <a href="/" className="transition hover:underline text-primaryBlue-primary">Go Back</a>
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
            <h1 className="text-4xl font-bold transition-all hover:text-primaryBlue-primary">501</h1>
            <p>Work in progress</p>
            <a href="/" className="transition hover:underline text-primaryBlue-primary">Go Back</a>
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
            <h1 className="text-4xl font-bold transition-all hover:text-primaryBlue-primary">503</h1>
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

