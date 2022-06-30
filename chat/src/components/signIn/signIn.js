import React from "react";

import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref, child, onValue, set, push} from "firebase/database";


export default function SignIn(props) {

  const db = getDatabase(props.App);
  const dbRef = ref(db);
  const auth = getAuth(props.App);
  const user = auth.currentUser;

  const nameFromEmail = (email) => {
    const name = email.substring(0, email.lastIndexOf("@"));
    return name;
  };

  const domainFromEmail = (email) => {
    const domain = email.substring(email.lastIndexOf("@") + 1);
    return domain;
  };

  const addCurrentUsertoDatabase = (user) => {
    set(ref(db, "users/" + nameFromEmail(user.email)), {
      chats: {},
      email: domainFromEmail(user.email),
      name: user.displayName,
    });
  };

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };


  return (
    <div className="SignIn">
      <button onClick={handleSignIn}>Sign In!!!</button>
    </div>
  );
}
