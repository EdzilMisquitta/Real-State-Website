import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Header() {
  const location = useLocation();
  const [Pagestatus,setPagestatus]=useState("SignIn")
  const auth= getAuth()
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setPagestatus("Profile")
      }
      else{
        setPagestatus("SignIn")
      }
    })
  })
  function pathhover(route) {
    if (route === location.pathname) {
      return true;
    }
  }


  //naviagate link

  const navigate = useNavigate();

  function log() {
    navigate("/");
  }
  function home() {
    navigate("/");
  }
  function offer() {
    navigate("/Offer");
  }
  function sign_in() {
    navigate("/Profile");
  }
  function About_us(){
    navigate("/Aboutus")
  }

  return (
    <div className="bg-slate-100 border shadow-sm sticky z-40 mt-6 w-11/12 text-center m-auto rounded-3xl mb-6 border-black ">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://images-platform.99static.com//GnBbJq2p2wjEvcNnYMC-75JhGY0=/84x0:641x557/fit-in/500x500/projects-files/19/1909/190939/adcd47a7-ca55-464a-9357-735989f0d8b8.png"
            alt="log"
            className="h-16 cursor-pointer "
            onClick={log}
          />
        </div>
        <div>
          <ul className="flex space-x-10 ">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
            ${pathhover("/") && "text-black border-b-red-700"}`}
              onClick={home}
            >
              Home
            </li>

            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
            ${pathhover("/Offer") && "text-black border-b-red-700"}`}
              onClick={offer}
            >
              Offer
            </li>

            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
            ${(pathhover("/SignIn") || pathhover("/Profile")) && "text-black border-b-red-700"}`}
              onClick={sign_in}
            >
              {Pagestatus}
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
            ${(pathhover("/SignIn") || pathhover("/Profile")) && "text-black border-b-red-700"}`}
              onClick={About_us}
            >
              About Us
            </li>

          </ul>
        </div>
      </header>
    </div>
  );
}
export default Header; //onClick={function x(){navigate("/")}}
