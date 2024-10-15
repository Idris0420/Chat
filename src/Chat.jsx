import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "./firebase-config"

function Chat(props){
    const {room} = props;
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messageRef = collection(db, "messages");

    useEffect(() => {
        const querryMessages = query(messageRef, where("room", "==", room))
        onSnapshot(querryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });

            })
            setMessages(messages)
        })
    }, [])

    async function handleSubmit(e){
        e.preventDefault();
        if(!message) return;
        console.log(message);
        await addDoc(messageRef,{
            text: message,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room
        })

        setMessage("")
    }

    
    return(
        <div>
            <div>{messages.map((message) => <h1>{message.text}</h1>)}</div>
            <form onSubmit={handleSubmit}>
                <input value={message} placeholder="Enter your text here" onChange={e => setMessage(e.target.value)}/> <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Chat