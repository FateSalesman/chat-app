  import React, { useEffect } from "react";
  import { signOut } from "firebase/auth";
  import {
    getDatabase,
    get,
    ref,
    child,
    onValue,
    set,
    push,
    serverTimestamp,
  } from "firebase/database";
  import { Timestamp } from "firebase/firestore";

  export default function ChatRoom(props) {
    const db = getDatabase(props.App);
    const dbRef = ref(db);

    const [currentChat, setCurrentChat] = React.useState({});
    const [form, setForm] = React.useState("");
    const [currentChatID, setcurrentChatID] = React.useState("1");

    const email = props.User.email;

    const nameFromEmail = (email) => {
      const name = email.substring(0, email.lastIndexOf("@"));
      return name;
    };

    const getDisplayNameFromEmail = (email) => {
      return get(ref(db, "users/" + nameFromEmail(email) + "/name")).then(
        (snapshot) => {
          return snapshot.val();
        }
      );
    };

    const domainFromEmail = (email) => {
      const domain = email.substring(email.lastIndexOf("@") + 1);
      return domain;
    };

    const isUserInDatabase = (email) => {
      get(child(dbRef, "users/" + nameFromEmail(email))).then((snapshot) => {
        return snapshot.exists();
      });
    };

    const getTime = () => {
      return Timestamp.now();
    };

    const addCurrentUsertoDatabase = (email) => {
      set(ref(db, "users/" + nameFromEmail(email)), {
        chats: {},
        email: domainFromEmail(email),
        name: props.User.displayName,
      });
    };

    const createNewChat = (email1, email2) => {
      const chatKey = push(ref(db, "chat"), {
        members: {
          0: email1,
          1: email2,
        },
      });
      set(
        ref(db, "users/" + nameFromEmail(email1) + "/chats/" + chatKey.key),
        true
      );
      set(
        ref(db, "users/" + nameFromEmail(email2) + "/chats/" + chatKey.key),
        true
      );
    };

    const sendMessage = (chatKey, email, content) => {
      set(
        ref(db, "chats/" + chatKey + "/messages/" + Math.trunc(Timestamp.now())),
        {
          content: content,
          sender: email,
        }
      );
    };


    const handleSubmit = (e) => {
      e.preventDefault();
      sendMessage(1, props.User.email, form);
      setForm("");
    };

    useEffect(() => {
      onValue(ref(db, "chats/" + currentChatID + "/messages"), (snapshot) => {
        if (snapshot.exists()) {
          setCurrentChat(snapshot.val())
        }
      })
    }, [currentChatID]);

    
    

    return (
      <div className="ChatRoom">
        {Object.keys(currentChat).map((kei) => <p key={kei}>{currentChat[kei]["content"]}</p>)}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message"
            value={form}
            onChange={(e) => setForm(e.target.value)}
          />
        </form>
      </div>
    );
  }
