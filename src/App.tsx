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
import { auth } from "./firebase-config";
import { NvgUI } from "./pages/novagon_ui";
import { Profile } from "./pages/profile";
import ChatRoom from "./pages/chat";
import { HomeUI, LandingPage } from "./pages/dashboard";
import { Menu, Transition } from "@headlessui/react";

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
        <nav className="flex flex-row flex-wrap items-center justify-center w-full py-6 mx-auto sm:justify-between">
          <div className="flex items-center space-x-4">
            <img src="https://novagoncdn.netlify.app/logo/nvgweb/Novagon%20Web%403x.png" alt="Novagon Logo" className="hidden w-16 rounded-xl sm:block" />
            <h2 className="hidden text-2xl md:block">Novagon Web</h2>
          </div>
          <div className="hidden space-x-3 sm:block">
            <a href="/">Home</a>
            <a href="/chat">Chat</a>
            <a href="/videos">Videos</a>
            <a href="/images">Images</a>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="block sm:hidden">
              <Menu>
                <Menu.Button>
                  <Squares2X2Icon className="w-8 h-8" />
                </Menu.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/chat"
                        >
                          <ChatBubbleLeftRightIcon /> Chat
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
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
          <Route path="/home" element={<HomeUI />} />
          <Route path="/settings" element={<WorkInProgress/>} />
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

