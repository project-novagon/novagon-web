import { Children } from "react";
import guestPFP

interface userCardProps {
    children: any,
    photoURL: string,
    userName: string,
}

function UserCard({children, photoURL, userName}: userCardProps){
    return (
        <div>
            <div>
                <img src={photoURL? photoURL : g} alt="" />
                <h4></h4>
                <p></p>
            </div>
        </div>
    )
}

export {UserCard};