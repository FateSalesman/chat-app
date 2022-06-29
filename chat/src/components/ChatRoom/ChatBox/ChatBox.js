import React from "react";


export default function ChatBox() {
    const db = getFirestore();
    
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp"), limit(25)); 

    const [messages, loading, error] = useCollectionData(q);

    


}