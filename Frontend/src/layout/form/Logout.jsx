import { useEffect } from 'react';
import { logout } from '../../services/authService';
import { useMyContext } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const { setUser } = useMyContext()
    const navigate= useNavigate()

    useEffect(() => {
        logout(setUser)
        navigate('/')

    }, []);
    return <h1>logout</h1>;
}

export default Logout;