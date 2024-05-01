import { Navigate, Outlet, Route } from "react-router-dom";

const ProtectedRoute = () => {
    const token=localStorage.getItem('token')
    const role = localStorage.getItem('role');
    if (token) {
        return (role === 'Admin' ? <Outlet /> : <Navigate to='/notFound' />);
    } else {
        return <Navigate to='/login' />
    }

    
}
 
export default ProtectedRoute;