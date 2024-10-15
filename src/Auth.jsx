import { auth, provider} from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies  from "universal-cookie";

const cookies = new Cookies();
function Auth(props){
    const {setIsAuth} = props;
    async function googleSignIn(){
        try{const result = await signInWithPopup(auth, provider);
        console.log(result);
        setIsAuth(true);
        cookies.set("auth-token", result.user.refreshToken)
        } catch(err){ 
            console.log(err);
        }
    }
    return(
        <div>
            <p>Sign in with Google to continue</p>
            <button onClick={googleSignIn}>Sign In With Google</button>
        </div>
    );
}

export default Auth