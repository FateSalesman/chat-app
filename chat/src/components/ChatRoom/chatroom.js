import React from "react";
import { signOut } from 'firebase/auth'
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from 'firebase/firestore'

export default function ChatRoom(props) {

    const messageRef = collection('messages');
    const query = messageRef.orderBy('timestamp').limit(25);

    return (
        <div className="ChatRoom">
            <p>Hello!</p>
            <p>Current User: {props.User.email}</p>
            <button onClick={() => {signOut(props.Auth)}}>Log out</button>
        </div>
    )
}