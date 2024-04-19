import { NavLink, Link} from "react-router-dom";

const Navbar = () => {
    const navbarItem = [
        {name:'services',to:'#'},
        {name:'Our Developer',to:'#'},
        {name:'contact Us',to:'#'},
        {name:'About',to:'#'},
    ]
    return ( 
        <>
            <nav className=" z-20 flex items-center  bg-slate-100 sticky top-0 p-5">
                <NavLink className='text-2xl font-bold text-orange-800' to='/home'>Library.ai</NavLink>
                <div className="flex ms-8 justify-between items-center w-full" >
                    <ul className="flex">
                        {navbarItem.map(item => (
                        <li key={item.name} className=" mx-4">
                            <NavLink to={item.to}>{item.name}</NavLink>
                        </li>
                        ))}
                    </ul>
                    <ul className="flex w-40 items-center justify-evenly">
                        <li className="text-slate-50 bg-orange-800 p-1 w-20 text-center rounded-lg">
                            <Link to='/login'><button>log in</button></Link>
                        </li>
                        <li className="text-slate-50 bg-orange-800 p-1 w-20 text-center rounded-lg ms-4">
                        <Link to='/signUp'><button>Sign Up</button></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;