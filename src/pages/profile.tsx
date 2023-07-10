import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { deleteUser } from "firebase/auth";

function Profile() {
    const user = auth.currentUser;
    const deleteAccount = () => {

        deleteUser(user).then(() => {
            auth.signOut()
        }).catch((error) => {
            console.log("Account Could Not be deleted")
        });
    }
    return (
        <>
            <div className="space-y-3">
                <h1 className="text-3xl">Hello, {user?.displayName ? <h1 className="inline">{user.displayName}</h1> : <><h1 className="inline">Guest</h1></>}!</h1>
                {user?.photoURL ? <img src={user.photoURL} alt="User Profile Picture" className="w-32 transition-all border-4 rounded-lg shadow-lg dark:border-white hover:border-primaryBlue-primary" /> : <img src="https://novagoncdn.netlify.app/img/guest_pfp.png" alt="Guest Profile Picture" className="w-32 transition-all border-4 rounded-lg shadow-lg dark:border-white hover:border-primaryBlue-primary" />}
            </div>
            <div>
                <h2 className="text-2xl">Info</h2>
                {user?.phoneNumber &&
                    <div>
                        <h3 className="text-xl">Phone Number</h3>
                        <p>{user?.phoneNumber}</p>
                    </div>
                }
                {user?.email &&
                    <div>
                        <h3 className="text-xl">E-Mail</h3>
                        <p>{user?.email}</p>
                    </div>
                }
                {user?.uid &&
                    <div>
                        <h3 className="text-xl">User ID</h3>
                        <p>{user?.uid}</p>
                    </div>
                }
                <button onClick={() => auth.signOut()} className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700">Sign Out</button>
                <h2 className="text-2xl">Danger Zone</h2>
                <button onClick={deleteAccount} className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700">Delete Account</button>
            </div>
        </>
    )
}

export { Profile };