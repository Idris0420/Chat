import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "./firebase-config"

function Chat(props){
    const {room, setRoom} = props;
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messageRef = collection(db, "messages");

    useEffect(() => {
        const querryMessages = query(messageRef, where("room", "==", room), orderBy("createdAt"))
        const unsubscribe = onSnapshot(querryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });

            })
            setMessages(messages)
        })

        return () => unsubscribe();
    }, [])

    async function handleSubmit(e){
        e.preventDefault();
        if(!message) return;
        console.log(message);
        await addDoc(messageRef,{
            text: message,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room,
            userImg: auth.currentUser.photoURL
        })

        setMessage("")
    }

    
    return(
        <div className="chatContainer">
            <button className="leaveButton" onClick={() => setRoom("")}>⬅</button>
            <div className="chatRoom">
                <div className="roomTitle">
                    <h1>Welcome to Room: {room}</h1>
                </div>
                <div className="chats">
                    {messages.map((message) => 
                    <div key={message.id} className="userAndMessage">
                        <img src={message.userImg} alt="" />
                        <div>
                            <p>{message.user}</p>
                            <div className="chatBubble">{message.text}</div>
                            <p className="chatTime">
                                {message.createdAt 
                                ? message.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                                : "Time not available"}
                            </p>
                        </div>
                    </div>
                    )}
                </div>

                <div className="chatInput">
                    <form onSubmit={handleSubmit}>
                        <input value={message} placeholder="Enter your text here" onChange={e => setMessage(e.target.value)}/> <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat