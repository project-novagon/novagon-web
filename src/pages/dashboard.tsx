import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase-config"
import { SignIn } from "../components/AuthSys";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { UserCard } from "../components/userCard";
import { FeatureCard } from "../components/ui/featureCard";
import { BeakerIcon, CodeBracketSquareIcon } from "@heroicons/react/24/outline";

function LandingPage() {
    const [user] = useAuthState(auth);

    return (
        <>
            {user ?
                <HomeUI />
                :
                <>
                    <div className="flex flex-col items-start self-stretch justify-center w-full p-16 space-y-5 bg-center bg-cover shadow-2xl h-96 bg-hero-img">
                        <div className="p-2 space-y-4 transition-all backdrop-blur-lg rounded-xl hover:backdrop-blur-sm">
                            <h1 className="text-3xl">Where the ideas are shared.</h1>
                            <p className="flex-wrap w-64 font-jbmono">Novagon Web. The First Open Source Social Media. Built For Everyone</p>
                            <button>
                                <Link to="/home">Sign In / Up</Link>
                            </button>
                        </div>
                    </div>
                    <div className="p-8">
                        <h1 className="text-3xl">Features</h1>
                        <div className="grid gap-8 md:grid-cols-2">
                            <FeatureCard Title="Open" iconJSX={<CodeBracketSquareIcon className="w-8" />} Desc="Novagon Web is Open-Source, that means anyone can help make Novagon Web better" />
                            <FeatureCard Title="Lorem ipsum" iconJSX={<BeakerIcon className="w-8" />} Desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam earum dolorem nemo repellat sint aspernatur maxime minus, perferendis quos nisi ullam beatae? In alias quas nostrum officia corrupti, ab ullam!" />
                            <FeatureCard Title="Lorem ipsum" iconJSX={<BeakerIcon className="w-8" />} Desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam earum dolorem nemo repellat sint aspernatur maxime minus, perferendis quos nisi ullam beatae? In alias quas nostrum officia corrupti, ab ullam!" />
                            <FeatureCard Title="Lorem ipsum" iconJSX={<BeakerIcon className="w-8" />} Desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam earum dolorem nemo repellat sint aspernatur maxime minus, perferendis quos nisi ullam beatae? In alias quas nostrum officia corrupti, ab ullam!" />
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