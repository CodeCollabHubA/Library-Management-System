import { NavLink, Link } from "react-router-dom";

const Navbar = ({ navbarItem, handleClick, showMenu }) => {

    return (
        <>
            <nav className=" z-20 flex items-center justify-between bg-slate-100 sticky top-0 p-5">
                <NavLink className='flex items-center text-3xl font-bold text-orange-800' to='/'>
                    <svg viewBox="0 0 1024 1024"
                        className="flex-shrink-0 w-10 h-10 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"><path d="M21.333333 810.666667h981.333334v42.666666H21.333333zM533.333333 384h85.333334v341.333333h-85.333334zM661.333333 384h85.333334v341.333333h-85.333334zM789.333333 384h85.333334v341.333333h-85.333334zM405.333333 384h85.333334v341.333333h-85.333334zM277.333333 384h85.333334v341.333333h-85.333334zM149.333333 384h85.333334v341.333333H149.333333zM917.333333 341.333333H106.666667v-64l405.333333-192 405.333333 192zM106.666667 725.333333h810.666666v42.666667H106.666667z" fill="#FF9800"></path><path d="M533.333333 341.333333h85.333334v42.666667h-85.333334zM661.333333 341.333333h85.333334v42.666667h-85.333334zM789.333333 341.333333h85.333334v42.666667h-85.333334zM405.333333 341.333333h85.333334v42.666667h-85.333334zM277.333333 341.333333h85.333334v42.666667h-85.333334zM149.333333 341.333333h85.333334v42.666667H149.333333zM64 768h896v42.666667H64z" fill="#EF6C00"></path><path d="M512 234.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z" fill="#EF6C00"></path></g>
                    </svg>
                    Library.ai</NavLink>
                {/* hubmerger Icon */}
                <button onClick={handleClick} className="text-3xl md:hidden focus:border-4 rounded-md border-blue-500 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                        <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                    </svg>
                </button>


                <div className=" hidden md:flex ms-8 justify-between items-center" >
                    <ul className="flex">
                        {navbarItem.map(item => (
                            <li key={item.id} className=" mx-4">
                                <NavLink to={item.to}>{item.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex w-44 grow items-center justify-evenly">
                        <li >
                            <Link to='/login'><button className="hover:underline hover:text-blue-800">Login</button></Link>
                        </li>
                        <li className="hover:underline">
                            <Link to='/signup'><button className="hover:underline hover:underline-offset-1 hover:text-blue-800">Sign up</button></Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className={showMenu ? 'relative h-screen md:hidden bg-slate-600' : 'hidden'}>
                <ul className='w-full mx-auto'>
                    {navbarItem.map(item => (
                        <li key={item.id} className='text-center p-10 text-5xl hover:text-gray-600 bg hover:bg-slate-300'>
                            <Link to={item.to}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Navbar;