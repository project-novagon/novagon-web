import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase-config"
import { SignIn } from "../components/AuthSys";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";

function LandingPage() {
    const [user] = useAuthState(auth);

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full space-y-5 bg-white rounded-lg dark:bg-slate-300 h-96 bg-gradient-to-bl from-primaryBlue-primary to-violet-900">
                <h1 className="text-3xl">Welcome To Novagon Web</h1>
                <p>The FOSS All-In-One App.</p>
                <button>
                    <Link to="/home">Sign In</Link>
                </button>
            </div>
        </>
    )
}

function HomeUI() {
    const [user] = useAuthState(auth);
    return (
        <>
            <section className="p-6">
                {user ? <Dashboard /> : <SignIn />}
            </section>
        </>
    )
}

function Dashboard() {
    return (
        <div className="flex space-y-7">
            <div className="sticky top-0 w-48 h-screen p-4 dark:bg-zinc-700">
                <h1>Dashboard</h1>
                <ul>
                    <li>Item </li>
                    <li>Item </li>
                    <li>Item </li>
                    <li>Item </li>
                    <li>Item </li>
                </ul>
            </div>
            <div className="p-4">
                <Tab.Group>
                    <Tab.List>
                        <Tab>Tab 1</Tab>
                        <Tab>Tab 2</Tab>
                        <Tab>Tab 3</Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>Content 1</Tab.Panel>
                        <Tab.Panel>Content 2</Tab.Panel>
                        <Tab.Panel>Content 3</Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>

    )
}

export { HomeUI, LandingPage }