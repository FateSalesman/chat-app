import React from "react";
import { initializeApp } from "firebase/app";
import { signOut } from "firebase/auth";
import { getDatabase } from 'firebase/database';

export default function ChatRoom(props) {
  const [currentOpp, setCurrentOpp] = React.useState("");
  const [message, setMessage] = React.useState("");

  return (
    <div className="ChatRoom">
      <p>Hello!</p>
      <p>Current User: {props.User.email}</p>
      <button
        onClick={() => {
          signOut(props.Auth);
        }}
      >
        Log out
      </button>
      <p>Current Opp: {currentOpp}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Opp email"
          value={currentOpp}
          onChange={(e) => setCurrentOpp(e.target.value)}
        />
      </form>
      <p>Current message: {message}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input 
        type="text"
        placeholder="Type message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}/>
      </form>
    </div>
  );
}
