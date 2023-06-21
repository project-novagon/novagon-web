import { guestPFP } from "../firebase-config";

interface userCardProps {
    photoURL: any,
    userName: any,
}

function UserCard({ photoURL, userName}: userCardProps){
    return (
        <div>
            <div className="">
                <img src={photoURL? photoURL : guestPFP} alt="" />
                <h4>{userName? userName : "Guest"}</h4>
            </div>
        </div>
    )
}

export {UserCard};