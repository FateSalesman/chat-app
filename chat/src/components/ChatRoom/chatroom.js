import React from "react";
import { signOut } from 'firebase/auth'
import { useCollectionData } from "react-firebase-hooks/firestore";


export default function ChatRoom(props) {
    return (
        <div className="ChatRoom">
            <p>Hello!</p>
            <p>Current User: {props.User.email}</p>
            <button onClick={() => {signOut(props.Auth)}}>Log out</button>
        </div>
    )
}