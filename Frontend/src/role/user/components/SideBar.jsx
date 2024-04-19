import { Link, NavLink } from "react-router-dom";
const SideBar = ({ style }) => {
    const items = [
        { name: 'Dashboard', to: '/dashboard', img: '/src/assets/icons/dashboard.png' },
        { name: 'Books', to: '/dashboard/books', img: '/src/assets/icons/book.png' },
        { name: 'Users', to: '/dashboard/users', img: '/src/assets/icons/group.png' },
        { name: 'Requests', to: '#', img: '/src/assets/icons/chat.png' },
    ]
    return (
        <div className={`flex flex-col w-60 h-screen p-4 shadow-xl ${style}`}>
            <Link to='/' className=" flex justify-center items-center h-24 font-semibold text-2xl">
                <img className="w-8 h-8 me-4" src="/src/assets/icons/open-book.png" alt="" /> Library.ai</Link>

            <ul className="py-8 flex flex-col grow">
                {items.map(item => (
                    <li key={item.name} className="flex items-center my-2 h-10 rounded-lg hover:bg-sky-700 hover:text-white">
                        <img src={item.img} className="w-5 h-5 mx-4" /><NavLink className="text-lg" to={item.to}>{item.name}</NavLink>
                    </li>
                ))}
            </ul>
            <div className="flex justify-evenly items-center pt-4">
                <img className=" w-6 h-6" src="/src/assets/icons/user.png" alt="" />
                <img className=" w-6 h-6" src="/src/assets/icons/exit.png" alt="" />
            </div>
        </div>
    );
}

export default SideBar;