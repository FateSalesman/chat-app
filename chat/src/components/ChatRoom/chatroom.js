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
  const [chatList, setChatList] = React.useState([]);
  const [oppForm, setOppForm] = React.useState(""); 
  const [form, setForm] = React.useState("");
  const [currentChatID, setCurrentChatID] = React.useState("");
  const [opp, setOpp] = React.useState("No one");

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
    return get(child(dbRef, "users/" + nameFromEmail(email))).then((snapshot) => {
      return snapshot.exists();
    });
  };

  const chatExists = (email)

  const getTime = () => {
    return Timestamp.now();
  };

  const addCurrentUsertoDatabase = (email) => {
    set(ref(db, "users/" + nameFromEmail(email) + "/email"),domainFromEmail(email));
    set(ref(db, "users/" + nameFromEmail(email) + "/name"),props.User.displayName);
  };

  isUserInDatabase(props.User.email).then((bool) => {
    if (!bool) {
      addCurrentUsertoDatabase(props.User.email);
    }
  })

  const createNewChat = (email1, email2) => {
    const chatKey = push(ref(db, "chat"), {
      members: {
        0: email1,
        1: email2,
      },
    });
    set(
      ref(db, "users/" + nameFromEmail(email1) + "/chats/" + nameFromEmail(email2)),
      chatKey.key
    );
    set(
      ref(db, "users/" + nameFromEmail(email2) + "/chats/" + nameFromEmail(email1)),
      chatKey.key
    );
    return chatKey.key;
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

  // const handleNewChat = (e) => {
  //   e.preventDefault();
  //   get(ref(db, "users/" + nameFromEmail(oppForm)).then(
  //     (snapshot) => {
  //       if (snapshot.exists()) {
  //         get(ref(db, "users/" + nameFromEmail(props.User.email) + "/" + nameFromEmail(oppForm))).then(
  //           (snapshot2) => {
  //             if (snapshot2.exists()) {
  //               setCurrentChatID(snapshot2.val());
  //             } else {
  //               chatKey = createNewChat(oppForm, props.User.email);
  //               setCurrentChatID(chatKey);
  //             }
  //           }
  //         )
  //       } else {
  //         window.alert("There is no one with this email on this app");
  //       }
  //     }
  //   )
  //   };

    const handleNewChat = (e) => {
      e.preventDefault();
      get(ref(db, "users/" + nameFromEmail(oppForm))).then(
        (snapshot) => {
          if (snapshot.exists()) {
            console.log(nameFromEmail(oppForm));
            console.log(snapshot.val())
            get(ref(db, "users/" + nameFromEmail(props.User.email) + "/" + nameFromEmail(oppForm))).then(
              (snapshot2) => {
                if (snapshot2.exists()) {
                  setCurrentChatID(snapshot2.val());
                  console.log(snapshot2.val());
                } else {
                  console.log()
                  const chatKey = createNewChat(oppForm, props.User.email);
                  setCurrentChatID(chatKey);
                }
              }
            )
          } else {
            window.alert("This email is not registered on the app")
          }
        }
      )
    }

  const handleSubmit = (e) => {
    if (currentChatID === "") {
      e.preventDefault();
      window.alert("You're not in any chat, join one");
      return 0;
    }
    e.preventDefault();
    sendMessage(currentChatID, props.User.email, form);
    setForm("");
  };

  useEffect(() => {
    onValue(ref(db, "chats/" + currentChatID + "/messages"), (snapshot) => {
      if (snapshot.exists()) {
        setCurrentChat(snapshot.val());
      }
    });
  }, [currentChatID, db]);

  // useEffect(() => {
  //   onValue(ref(db, "users/" + nameFromEmail(props.User.email) + "/chats"), (snapshot) => {
  //     if (snapshot.exists()) {
  //       setChatList(Object.keys(snapshot.val()));
  //     }
  //   });
  // }, [db])

  return (
    <div className="ChatRoom">
      <form onSubmit={handleNewChat}>
        <input
          type="text"
          placeholder="Type email of person you want to chat to"
          value={oppForm}
          onChange={(e) => setOppForm(e.target.value)}
        />
        <button>Get Chat</button>
      </form>
      <p>Currently Chatting with {opp}</p>
      {Object.keys(currentChat).map((kei) => (
        <div>
        <p key={kei}>{currentChat[kei]["content"]}</p>
        <p className="sender">{currentChat[kei]["sender"]}</p>
        </div>
      ))}
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
