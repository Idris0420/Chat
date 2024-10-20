import { useRef, useState } from "react"
import Auth from "./Auth"
import Chat from "./Chat";
import Cookies from "universal-cookie";
import Header from "./Header";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";


const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState("");
    async function signUserOut(){
    signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  const inputRoom = useRef(null);

  if(!isAuth){
    return(
    <>
      <Auth setIsAuth={setIsAuth}/>
    </>
    );
  }

  return(<>{room ? <div className="insideRoom"> <Header/> <Chat room={room} setRoom={setRoom}/></div>  :
        <div className="roomInput">
          <Header/>
          <h1>Input the room you want to go</h1>
          <input type="text" ref={inputRoom} placeholder="Room Name"/><br />
          <button onClick={() => setRoom(inputRoom.current.value.trim())}>Enter Room</button>
        </div>}
        <button onClick={signUserOut}>Sign Out</button>
        </>
        ); 
}
export default App
