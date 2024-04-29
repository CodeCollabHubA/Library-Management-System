import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage';
import Logout from './layout/form/Logout';
import LoginForm from './layout/form/LoginForm';
import SignupForm from './layout/form/SignupForm';
import Dashboard from './pages/Dashboard';
import Navbar from './layout/landingPage/Navbar';
import NotFound from './layout/shared/NotFound';
import FooterSection from './layout/shared/FooterSection';
import useAppInitialLoad from './hooks/useAppInitialLoad';
import { navbarItem } from "./utils/constant"
import { useMyContext } from './context/ContextProvider';
import ProtectedRoute from './components/common/protectedRoute';


const App = () => {
  
  const [showMenu, setShowMenu] = useState(false)
  
  useAppInitialLoad()

  const { user } = useMyContext()
  user&&localStorage.setItem('role',user.role)
  

  const handleClick = () => {
    setShowMenu(!showMenu)
  }


  return (
    <>
      <Routes>
        <Route path='/'
          element={
            <>
              <Navbar navbarItem={navbarItem} handleClick={handleClick} showMenu={showMenu} />
              <Outlet />
              <FooterSection />
            </>
          }>
          <Route path='/' element={<LandingPage />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/dashboard/*' element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;