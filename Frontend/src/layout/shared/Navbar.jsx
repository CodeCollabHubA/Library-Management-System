import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";

import NotificationIcon from "./notifiacationIcon";
// import CartIcon from "./cartIcon";


const Nav = () => {


    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
            <div className="h-[70px] px-3 py-3 lg:px-5 lg:pl-3 lg:mx-10">
                <div className="h-full flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <Link to="/" className="flex justify-around items-center w-40">
                            <FontAwesomeIcon fontSize={'2rem'} icon={faBookOpenReader} />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Library.ai</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <div className="w-32 flex justify-between items-center">

                                {/* ######## notifaction section ########## */}
                                <NotificationIcon />

                                {/* ######## cart section ########## */}
                                {/* <CartIcon /> */}

                                {/* ######## user avatar section ########## */}
                                <Link to="/dashboard/profile" type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user" />
                                </Link>
                            </div>
                            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                                        Neil Sims
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                        neil.sims@flowbite.com
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <a href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " role="menuitem">
                                            Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            Settings</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;