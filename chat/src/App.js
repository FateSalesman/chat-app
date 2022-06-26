
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import SignIn from "./components/signIn/signIn";
import ChatRoom from "./components/ChatRoom/chatroom";

const firebaseConfig = {
  apiKey: "AIzaSyAciRoBy5SPVhfa2WzV_kEnIjWrqB1sc_U",
  authDomain: "chatter-df0d5.firebaseapp.com",
  databaseURL: "https://chatter-df0d5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatter-df0d5",
  storageBucket: "chatter-df0d5.appspot.com",
  messagingSenderId: "668997325699",
  appId: "1:668997325699:web:3cf1dee8df8f0e08d6dcb6",
  measurementId: "G-8MNENF96FZ"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth();


function App() {

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="app">
        <p>Initializing User..</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="app">
        <p>Error: {error}</p>
      </div>
    )
  }
  if (user) {
    return (
      <div className="app">
        <ChatRoom User={user} Auth={auth}/>
      </div>
    )
  }
  else {
    return (
      <div className="app">
        <SignIn Auth={auth}/>
      </div>
    )
  }
}

export default App;
