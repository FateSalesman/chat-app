import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Auth } from "firebase/auth";

import SignIn from "./components/signIn/signIn";
import ChatRoom from "./components/ChatRoom/chatroom";

const firebaseConfig = {
  apiKey: "AIzaSyAciRoBy5SPVhfa2WzV_kEnIjWrqB1sc_U",
  authDomain: "chatter-df0d5.firebaseapp.com",
  databaseURL:
    "https://chatter-df0d5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatter-df0d5",
  storageBucket: "chatter-df0d5.appspot.com",
  messagingSenderId: "668997325699",
  appId: "1:668997325699:web:3cf1dee8df8f0e08d6dcb6",
  measurementId: "G-8MNENF96FZ",
};

const handleClick = () => {
  auth.signOut();
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="app">
        <p> Initializing User.. </p>{" "}
      </div>
    );
  }
  if (error) {
    return (
      <div className="app">
        <p> Error: {error} </p>{" "}
      </div>
    );
  }
  if (user) {
    return (
      <div className="app">
        <p>Current User: {user.displayName}</p>
        <ChatRoom App={app} User={user} Auth={auth} />
        <form onSubmit={(e) => {e.preventDefault()}}>
          <button type="button" onClick={handleClick}>Sign Out</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="app">
        <SignIn Auth={auth} />
      </div>
    );
  }
}

export default App;
