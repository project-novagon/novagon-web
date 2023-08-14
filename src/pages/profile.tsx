import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";

function Profile() {
    const [user] = useAuthState(auth);
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
            </div>
        </>
    )
}

function EditProfile(){
    return(
        <>

        </>
    )
}

export { Profile };