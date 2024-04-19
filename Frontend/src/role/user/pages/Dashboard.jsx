import FooterSection from "../../../components/HomePage_Parts/footerSection";
import Nav from "../../../components/common/_nav";
import Sidebar from "../components/SideBar";
import Main from "../components/Main";

import useAsidePosition from "../hooks/useAsidePosition";

import "./style.scss"
const Dashboard = () => {
    const { footerRef, asidePosition } = useAsidePosition()
    return (
        <>
            <div className="flex relative">
                <Sidebar style={`${asidePosition} bottom-0`} />
                <section className="content bg-slate-100 min-h-lvh ml-60 w-full ">
                    <Nav />
                    <Main />
                </section>
            </div>
            <FooterSection footerRef={footerRef} />

        </>
    );
}

export default Dashboard;