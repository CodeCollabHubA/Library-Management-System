import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dashboardItem } from "./dashboardItem";
import { useMyContext } from "../../context/ContextProvider";

const SideBar = ({ sideBarPosition }) => {


    const NLstyle = 'flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group';
    const SPstyle = 'flex-1 ms-3 whitespace-nowrap';
    const inboxNotify_style = 'inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full'
    const logout_style = { color: 'tomato' }
    const { user } = useMyContext()
    return (
        <aside id="logo-sidebar" className={`md:w-48 lg:w-64 bottom-0 left-0 z-40 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${sideBarPosition}`} aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2  mt-6 font-medium">
                    {dashboardItem.map(item => item.role.includes(user?.userRole) ?
                        (
                            <li key={item.id}>
                                <NavLink to={item.to} className={NLstyle}>
                                    <FontAwesomeIcon fontSize={'1.3rem'} icon={item.icon} style={item.name === 'Logout' ? logout_style : null} />
                                    <span className={SPstyle}>{item.name}</span>
                                    {item.name === "Inbox" ? <span className={inboxNotify_style}>3</span> : null}
                                </NavLink>
                            </li>
                        ) : null
                    )}
                </ul>
            </div>
        </aside>
    );
}

export default SideBar;