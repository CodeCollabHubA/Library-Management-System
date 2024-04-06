import Content from "./utilities/_content";
import Nav from "./utilities/_nav";
import SideBar from "./utilities/_sideBar";
const Dashboard = () => {
    return ( 
        <div className="flex ">
            <SideBar />
            <section className="content h-[100rem] ml-60 w-full bg-slate-100">
                <Nav />
                <Content />
            </section>
        </div>
    );
}
 
export default Dashboard;