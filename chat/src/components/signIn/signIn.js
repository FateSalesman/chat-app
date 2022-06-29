import React from "react";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignIn(props) {
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(props.Auth, provider);
  };

  return (
    <div className="SignIn">
      <button onClick={handleSignIn}>Sign In!!!</button>
    </div>
  );
}
