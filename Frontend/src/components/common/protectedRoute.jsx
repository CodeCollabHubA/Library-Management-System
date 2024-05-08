import { Navigate, Outlet, Route } from "react-router-dom";
import { useMyContext } from "../../context/ContextProvider";

const ProtectedRoute = () => {
    const { user } = useMyContext()

    if (user) {
        return (user?.userRole === 'Admin' ? <Outlet /> : <Navigate to='/notFound' />);
    } else {
        return <Navigate to='/login' />
    }


}

export default ProtectedRoute;