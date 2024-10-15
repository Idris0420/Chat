import { useRef, useState } from "react"
import Auth from "./Auth"
import Chat from "./Chat";
import Cookies from "universal-cookie";


const cookies = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState("");

  const inputRoom = useRef(null);

  if(!isAuth){
    return(
    <>
      <Auth setIsAuth={setIsAuth}/>
    </>
    );
  }
  return(room ? <div><Chat room={room}/></div> : 
        <div>
          <input type="text" ref={inputRoom} /><br />
          <button onClick={() => setRoom(inputRoom.current.value)}>Enter Room</button>
        </div>)

}
export default App
