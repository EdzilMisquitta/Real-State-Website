import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Header() {
  const location = useLocation();
  const [Pagestatus, setPagestatus] = useState("SignIn");
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPagestatus("Profile");
      } else {
        setPagestatus("SignIn");
      }
    });
  });
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
  function About_us() {
    navigate("/Aboutus");
  }

  return (
    <div className="bg-slate-100 border shadow-sm sticky z-40   text-center mb-2 ">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://i.pinimg.com/736x/aa/6c/8c/aa6c8c1ac0cfd0dfff052ab8c54018b3.jpg"
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
            ${
              (pathhover("/SignIn") || pathhover("/Profile")) &&
              "text-black border-b-red-700"
            }`}
              onClick={sign_in}
            >
              {Pagestatus}
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
            ${
              (pathhover("/SignIn") || pathhover("/Profile")) &&
              "text-black border-b-red-700"
            }`}
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
