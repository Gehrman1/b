import {FcGoogle} from "react-icons/fc";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {auth} from "../../utils/firebase";
import {useRouter} from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect} from "react";

export default function Login() {
    const route = useRouter();
    const [user,setUser] = useAuthState(auth);

    const googleProvider = new GoogleAuthProvider();
    //Sign in with google and once signed in redirect to home page
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            route.push("/")
        } catch (error) {
            console.log(error);
        }

    }
    // If there is a user already logged before redirect to home page
    useEffect(() => {
        if(user){
            route.push("/")
        }else {
            console.log("No user")
        }
    },[user])
    return(
        <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
            <h2 className="text-2xl font-medium">Join Today</h2>
            <div className="py-4">

                <h3 className="py-4">Sign in with one of the providers</h3>
                <button onClick={GoogleLogin} className= " gap-2 text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4"> <FcGoogle className="text-2xl" />Sign in with google</button>

            </div>
        </div>
    )
}