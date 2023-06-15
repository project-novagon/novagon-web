import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";

function Profile( ) {
    const [user] = useAuthState(auth); 
    return (
        <h1>hi</h1>
    )
}

export { Profile };