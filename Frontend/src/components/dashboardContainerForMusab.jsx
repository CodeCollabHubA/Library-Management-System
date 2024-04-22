
import Dashboard from "../pages/Dashboard";
import SideBar from "./SideBar/ssidebar";
// import Books from "../pages/books";
import Books from "../role/user/pages/Books";
import BookDetails from "../role/user/pages/BookDetails";
import Borrow from "../role/user/pages/Borrow";
import Profile from "../role/user/pages/Profile";
import ProfileForm from "../role/user/form/profileForm";
import PasswordForm from "../role/user/form/passwordForm";
import Users from "../pages/users";
import { Outlet, Routes, Route } from "react-router-dom";
import Inbox from "../pages/inbox";
import NotFound from "./notFound";
const DashboardContainer = () => {
    return (
        <>
            <SideBar />
            <section className="content bg-slate-100 min-h-lvh lg:ml-[16rem] md:ml-[12rem] sm:ml-[9rem]">
                <div className="flex h-screen">
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path='inbox/*' element={<Inbox />} />
                        <Route path='books' element={<Books />} />
                        <Route path='books/:id' element={<BookDetails />} />
                        <Route path='borrow/:id' element={<Borrow />} />
                        <Route path='profile' element={<Profile />} />
                        <Route path='profile/update' element={<ProfileForm />} />
                        <Route path='profile/update/updatePassword' element={<PasswordForm />} />
                        <Route path='users/*' element={<Users />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </section>
        </>
    );
}

export default DashboardContainer;