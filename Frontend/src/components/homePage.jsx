import React,{ useState }  from 'react';
import Navbar from './HomePage_Parts/navbar'
import HeroSection from './HomePage_Parts/heroSection'
import ContentSection from './HomePage_Parts/contentSection'
import FooterSection from './HomePage_Parts/footerSection'
import { Link } from 'react-router-dom';



const Home = () => {
    const navbarItem = [
        {name:'Services',to:'#'},
        {name:'Our Developer',to:'#'},
        {name:'Contact Us',to:'#'},
        {name:'About',to:'#'},
    ]
    const [showMenu, setShowMenu] = useState(false)
    
    const handleClick = () => {
        setShowMenu(!showMenu)
    }

    return (
        <>
            <Navbar navbarItem={navbarItem} handleClick={handleClick} showMenu={showMenu} />
            <div className={showMenu?'relative h-screen md:hidden bg-slate-600':'hidden' }>
                <ul className='w-full mx-auto'>
                    {navbarItem.map(item => (
                        <li className='text-center p-10 text-5xl hover:text-gray-600 bg hover:bg-slate-300'>
                            <Link to={item.to}>{item.name}</Link>
                        </li>
                    )) }
                </ul>
            </div>

            <HeroSection />
            <ContentSection />
            <FooterSection />
        </>
    );
}
 
export default Home;
