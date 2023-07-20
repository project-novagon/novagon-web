import { useAuthState } from "react-firebase-hooks/auth"
import { auth, guestPFP } from "../firebase-config"
import { SignIn } from "../components/AuthSys";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { UserCard } from "../components/userCard";
import { FeatureCard } from "../components/ui/featureCard";
import { ArchiveBoxXMarkIcon, BeakerIcon, CodeBracketSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { SideBar } from "../components/ui/MenusIUI";
import { BanknotesIcon } from "@heroicons/react/24/solid";

function LandingPage() {
    const [user] = useAuthState(auth);

    return (
        <>
            {user ?
                <HomeUI />
                :
                <div className="flex flex-col h-screen">
                    <div className="flex flex-col items-start self-stretch justify-center w-full space-y-5 bg-center bg-cover shadow-2xl h-96 bg-hero-img">
                        <div className="w-full h-full backdrop-blur-lg">
                            <div className="p-4 m-16 space-y-4 text-white transition-all rounded-xl">
                                <h1 className="text-3xl">Where the ideas are shared.</h1>
                                <p className="flex-wrap w-64 font-jbmono">Novagon Web. The First Open Source Social Media. Built For Everyone</p>
                                <Link to="/home" className="button-primary">Sign In / Up</Link>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 space-y-4">
                        <h1 className="text-3xl">Features</h1>
                        <div className="grid gap-4 md:grid-cols-2">
                            <FeatureCard Title="Open" iconJSX={<CodeBracketSquareIcon className="w-8" />} Desc="Novagon Web is Open-Source, that means anyone can help make Novagon Web better" />
                            <FeatureCard Title="Maintained" iconJSX={<ArchiveBoxXMarkIcon className="w-8" />} Desc="Novagon Web is updated daily by the novagon staff!" />
                            <FeatureCard Title="100% Free" iconJSX={<BanknotesIcon className="w-8" />} Desc="Novagon web is completely free to use! but if you do want to support us you can subcribe to novagon+!" />
                            <FeatureCard Title="Lorem ipsum" iconJSX={<BeakerIcon className="w-8" />} Desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam earum dolorem nemo repellat sint aspernatur maxime minus, perferendis quos nisi ullam beatae? In alias quas nostrum officia corrupti, ab ullam!" />
                        </div>
                    </div>
                </div>
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
        <div className="flex main-content">
            <SideBar menuState={sbar} />
            <aside className="h-screen p-5 grow bg-slate-800">
                <p>Some other content</p>
            </aside>
        </div>
    )
}

export { HomeUI, LandingPage }