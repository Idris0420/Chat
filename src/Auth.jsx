import { auth, provider } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import Header from "./Header";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Auth(props) {
    const { setIsAuth } = props;

    async function googleSignIn() {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            setIsAuth(true);
            cookies.set("auth-token", result.user.refreshToken);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="authPage">
            <Header/>
            <h1>Sign in with Google to continue</h1>
            <button onClick={googleSignIn}>
                <FaGoogle />Sign In With Google
            </button>
        </div>
    );
}

export default Auth;
