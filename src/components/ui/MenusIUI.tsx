import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";
import { guestPFP } from "../../firebase-config";

interface featureProps {
    menuState: Boolean;
}

function SideBar(menuState: featureProps){
    const [user] = useAuthState(auth);
    if(menuState) {
        return(
            <>
                <main className="h-screen p-5 md:basis-64 basis-full dark:bg-zinc-600">
                    <h3 className="inline-flex items-center gap-2 text-xl"><img  className="w-8 rounded-full" src={user?.photoURL? user.photoURL : guestPFP} alt="User PFP" />{user?.displayName? user.displayName : "Guest"}</h3>
                </main>
            </>
        )
    }
    else{
        return null;
    }
}

export {SideBar}