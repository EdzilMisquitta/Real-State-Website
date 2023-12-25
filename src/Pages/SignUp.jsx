import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../Components/Oauth";
import { getAuth,createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {db} from "../Firebase"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";


function SignUp() {
  const [showpassword, setshowpassword] = useState(false);
  const navigate=useNavigate()

  function eyehandler() {
    setshowpassword((prevstate) => {
      if (prevstate === true) {
        return (prevstate = false);
      } else {
        return (prevstate = true);
      }
    });
  }

  const [formdata, setformdata] = useState({
    name:"",
    email: "",
    password: "",
  });

  const { name, email, password } = formdata;

  function datahandler(event) {
    setformdata((prevstate) => ({
      ...prevstate,
      [event.target.id]: event.target.value,
    }));
  }

  async function submithandler(event){
    event.preventDefault()
    try {
      const auth = getAuth();
      const  userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser,{displayName:name})
     console.log(auth)
      const user = userCredential.user;
      console.log(user)

      const form={...formdata}
      delete form.password
      form.timestamp=serverTimestamp()
      console.log(form)
      await setDoc(doc(db,"users",user.uid),form)
      navigate("/")
    } catch (error) {
      if (!password) {
        toast.error("Please Enter Password");
      } else if (!name) {
        toast.error("Please Enter Full Name");
      }
      else if(!email){
        toast.error("Please Enter Email");
      }
      else{
        toast.error("Something went wrong with the registration");
      }
      
    }
    
  }
  return (
    <section>
      <h1 className="text-center text-3xl mt-6 font-serif font-bold">
        Sign UP
      </h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        <div className="lg:w-[50%] md:w-[67%] mb-12 md:mb-6 ">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="signin"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={submithandler}>
            <input 
            type="text" 
            placeholder="Full Name" 
            value={name} id="name" 
            onChange={datahandler} 
            className="mb-6 w-full px-4 py-2 text-lx text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />
            
            <input
              type="email"
              value={email}
              placeholder="Email Address"
              onChange={datahandler}
              id="email"
              className="w-full px-4 py-2 text-lx text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
            />

            <div className="relative mb-6">
              <input
                type={showpassword ? "text" : "password"}
                value={password}
                id="password"
                onChange={datahandler}
                placeholder="Password"
                className="w-full px-4 
                py-2 text-lx text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              />
              {showpassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-lg cursor-pointer"
                  onClick={eyehandler}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-lg cursor-pointer"
                  onClick={eyehandler}
                />
              )}
              
            </div>
            <div className="flex justify-between  sm:text-lg whitespace-nowrap">
              <p className="mb-6">I Have a Account <Link to={"/SignIn"} className="text-red-600 hover:text-red-800  transition 
              duration-2000 ease-in-out ml-2">SignIn</Link></p>
              <p ><Link to={"/Forgot-Password"} className="text-blue-600 hover:text-blue-800  transition duration-2000 ease-in-out">
                ForgotPassword?</Link></p>
            </div>
            <div>
            <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md
             hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 " 
             type="submit">Sign Up</button>
          </div>
          <div className="my-4 flex items-center before:border-t before:flex-1 before:border-gray-300 
            after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <Oauth/>
          </form>
          
          </div>
      </div>
    </section>
  );
}
export default SignUp;
