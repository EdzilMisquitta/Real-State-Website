import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import Offer from "./Pages/Offer";
import Header from "./Components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./Pages/CreateListing";
import EditListing from "./Pages/EditListing";
import Listing from "./Pages/Listing";
import Category from "./Pages/Category";
import Aboutus from "./Pages/Aboutus";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          
          <Route path="/" element={<Home />}></Route>
          <Route path="/Profile" element={<PrivateRoute/>}>
            <Route path="/Profile" element={<Profile />}></Route>
          </Route>
          
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/Forgot-Password" element={<ForgotPassword />}></Route>
          <Route path="/Offer" element={<Offer />}></Route>

          <Route path="/Create-Listing" element={<PrivateRoute/>}>
            <Route path="/Create-Listing" element={<CreateListing/>}></Route>
          </Route>

          <Route path="/Edit-Listing" element={<PrivateRoute/>}>
            <Route path="/Edit-Listing:ID" element={<EditListing/>}></Route>
          </Route>

          <Route
            path="/category/:categoryName/:ID"
            element={<Listing />}
          />
           <Route
            path="/category/:categoryName"
            element={<Category/>}
          />
          <Route path="/Aboutus" element={<Aboutus/>}/>
        </Routes>
        
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
