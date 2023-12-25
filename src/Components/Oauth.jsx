import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { db } from "../Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Oauth() {
  const navigate = useNavigate();
  async function googlehandler() {
    try {
      const auth = getAuth();
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const docref = doc(db, "users", user.uid);
      

      const docSnap = await getDoc(docref);
      const forms = {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp(),
      };
      
      if (!docSnap.exists()) {
        await setDoc(docref,forms);
      }

      toast("Welcome "+user.displayName)
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong while registration with Google");
    }
  }
  return (
    <div className="flex">
      <button
        className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 
            uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-lg active:shadow-lg 
            transition duration-2000 rounded ease-in-out"
        type="button"
        onClick={googlehandler}
      >
        <FcGoogle className="text-lg bg-white rounded-full mr-3" />
        Continue With Google
      </button>
    </div>
  );
}
export default Oauth;
