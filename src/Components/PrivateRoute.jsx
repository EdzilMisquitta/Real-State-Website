import { Navigate, Outlet } from "react-router-dom"
import {UseAuthStatus} from "../Hooks/UseAuthStatus"
import Loading from "./Loading"

function PrivateRoute(){
    const {LoggedIN, Status}=UseAuthStatus()
    if(Status){
        return <Loading/>
    }
    
    return(
     (LoggedIN)?(<Outlet/>):(<Navigate to="/SignIn/"/>)
    )

}
export default PrivateRoute