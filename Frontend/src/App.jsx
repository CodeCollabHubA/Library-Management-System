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


const App = () => {

  const { user } = useMyContext()
  const [showMenu, setShowMenu] = useState(false)

  useAppInitialLoad()

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

        <Route path='/dashboard/*' element={
          user ?
            <Dashboard />
            :
            <LoginForm />
        } />
      </Routes>
    </>
  );
}

export default App;