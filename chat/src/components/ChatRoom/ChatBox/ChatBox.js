import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Firestore, getFirestore, collection, query, orderBy, limit } from "firebase/firestore";

export default function ChatBox() {
    const db = getFirestore();
    
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp"), limit(25)); 

    const [messages, loading, error] = useCollectionData(q);




}