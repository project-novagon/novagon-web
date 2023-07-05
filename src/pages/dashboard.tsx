import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase-config"
import { SignIn } from "../components/AuthSys";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { UserCard } from "../components/userCard";

function LandingPage() {
    const [user] = useAuthState(auth);

    return (
        <>
            {user ?
             <HomeUI />
            :
            <>
            <div className="flex flex-col items-start self-stretch justify-center w-full p-16 space-y-5 bg-right-bottom bg-cover shadow-2xl h-96 bg-hero-img">
                <div className="p-2 space-y-4 transition-all backdrop-blur-lg rounded-xl hover:backdrop-blur-sm">
                <h1 className="text-3xl">Where the ideas are shared.</h1>
                <p className="flex-wrap w-64 font-jbmono">Novagon Web. The First Open Source Social Media. Built For Everyone</p>
                <button>
                    <Link to="/home">Sign In</Link>
                </button>
                </div>
            </div>
        </>
            }
        </>
    )
}

function HomeUI() {
    const [user] = useAuthState(auth);
    return (
        <>
            <section className="p-0 md:p-6">
                {user ? <Dashboard /> : <SignIn />}
            </section>
        </>
    )
}

function Dashboard() {
    const [user] = useAuthState(auth);
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
                        <Tab>New</Tab>
                        <Tab>For You</Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <UserCard userName={user?.displayName} photoURL={user?.photoURL} />
                        </Tab.Panel>
                        <Tab.Panel>Content 2</Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>

    )
}

export { HomeUI, LandingPage }