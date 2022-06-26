import React from 'react';

import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'

export default function SignIn(props) {

    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(props.Auth, provider);
    }

    return (
        <div className="SignIn">
            <button onClick={handleSignIn}>Sign In!!!</button>
        </div>
    )
}

