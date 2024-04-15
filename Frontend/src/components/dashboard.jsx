// import Content from "./common/_content";
import Nav from "./common/_nav";
import SideBar from "./common/_sideBar";
import Books from "./books";

const Dashboard = () => {
    return (
        <div className="flex ">
            <SideBar />
            <section className="content h-lvh ml-60 w-full ">
                <Nav />
                <div className="stick top-0 h-16 flex items-center justify-center">
                    <input type="search" name="search" className="w-[15rem] h-[2rem] rounded-lg me-1" />
                    <img className='w-[2rem] h-[2rem]' src="/src/assets/icons/loupe.png" alt="" />
                </div>
                <Books/>
            </section>
        </div>
    );
}
 
export default Dashboard;