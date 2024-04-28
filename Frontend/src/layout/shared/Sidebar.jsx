import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faGauge, faInbox, faRightFromBracket, faUserGroup } from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ sideBarPosition }) => {
    return (
        <aside id="logo-sidebar" className={`md:w-48 lg:w-64 bottom-0 left-0 z-40 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${sideBarPosition}`} aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2  mt-6 font-medium">
                    <li>
                        <NavLink to="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                            <FontAwesomeIcon fontSize={'1.4rem'} icon={faGauge} />
                            <span className=" text-lg ms-3">Dashboard</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/inbox" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon fontSize={'1.4rem'} icon={faInbox} />
                            <span className="flex-1 text-lg ms-3 whitespace-nowrap">Inbox</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon fontSize={'1.4rem'} icon={faUserGroup} />
                            <span className="flex-1 text-lg ms-3 whitespace-nowrap">Users</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/booksGallery" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon fontSize={'1.4rem'} icon={faUserGroup} />
                            <span className="flex-1 ms-3 whitespace-nowrap">book Gallery</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/books" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon fontSize={'1.4rem'} icon={faUserGroup} />
                            <span className="flex-1 ms-3 whitespace-nowrap">book list</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/authors" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon fontSize={'1.4rem'} icon={faUserGroup} />
                            <span className="flex-1 ms-3 whitespace-nowrap">authors</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/publishers" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon fontSize={'1.4rem'} icon={faUserGroup} />
                            <span className="flex-1 ms-3 whitespace-nowrap">publishers</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon fontSize={'1.4rem'} icon={faAddressCard} />
                            <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/logout" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon style={{ color: 'tomato' }} fontSize={'1.4rem'} icon={faRightFromBracket} />
                            <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SideBar;