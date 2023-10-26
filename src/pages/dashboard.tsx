import { useAuthState } from "react-firebase-hooks/auth"
import { auth, guestPFP } from "../firebase-config"
import { SignIn } from "../components/AuthSys";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { UserCard } from "../components/userCard";
import { FeatureCard } from "../components/ui/featureCard";
import { BeakerIcon, CodeBracketSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ImageGrid } from "../components/ImageGrid";
import { VideoGrid } from "../components/videoGrid";

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
                                <Link to="/home" className="button-primary">Sign In / Up</Link>
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
            <section className="">
                {user ? <Dashboard /> : <SignIn />}
            </section>
        </>
    )
}

function Dashboard() {
    const [sbar, setSbar] = useState(true)
    const [user] = useAuthState(auth);
    return (
            <div className="p-4">
            <h1 className="hidden text-3xl sm:block">Hello, {user?.displayName ? user.displayName : "Guest"}</h1>
            
            </div>
    )
}

export { HomeUI, LandingPage }