import { Outlet, Routes, Route } from "react-router-dom";

// import Books from "../pages/books";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/users";
import Inbox from "../pages/inbox";

import Books from "../pages/role-user/Books";
import BookDetails from "../pages/role-user/BookDetails";
import Profile from "../pages/role-user/Profile";
import ProfileForm from "../pages/role-user/form/profileForm";
import PasswordForm from "../pages/role-user/form/passwordForm";

import FooterSection from "./HomePage_Parts/footerSection";
import SideBar from "./SideBar/sidebar";
import Nav from "./common/_nav";

import NotFound from "./notFound";

import useSideBarPosition from "../hooks/useSideBarPosition";
import MarginWrapper from "./MainWrapper";
const DashboardContainer = ({user}) => {
    const { footerRef, sideBarPosition } = useSideBarPosition()

    return (
        <>
            <Nav />
            <div className="main relative mt-[70px]">
                <SideBar sideBarPosition={sideBarPosition} />
                <section className="p bg-slate-100 min-h-lvh h-full lg:ml-[16rem] md:ml-[12rem] sm:ml-[9rem]">
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="/" element={<MarginWrapper />}>
                            <Route path='inbox/*' element={<Inbox />} />
                            <Route path='books' element={<Books />} />
                            <Route path='books/:id' element={<BookDetails />} />
                            <Route path='profile' element={<Profile />} />
                            <Route path='profile/update' element={<ProfileForm />} />
                            <Route path='profile/update/updatePassword' element={<PasswordForm />} />
                            <Route path='users/*' element={<Users />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </section>
            </div>
            <FooterSection footerRef={footerRef} />
        </>
    );
}

export default DashboardContainer;