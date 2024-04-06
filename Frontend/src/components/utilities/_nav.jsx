const Nav = () => {
    return ( 
        <div className="stick top-0 h-16 flex items-center justify-center">
                <input type="search" name="search" className="w-[15rem] h-[2rem] rounded-lg me-1"/>
                <img className='w-[2rem] h-[2rem]'src="/src/assets/icons/loupe.png" alt="" />
        </div>
     );
}
 
export default Nav;