import { Navigate, Outlet, Route } from "react-router-dom";
import { useMyContext } from "../../context/ContextProvider";

const ProtectedRoute = () => {
    const role = localStorage.getItem('role')

    return ( 
        role==='Admin'? <Outlet/>:  <Navigate to='/notFound'/>
     );
}
 
export default ProtectedRoute;