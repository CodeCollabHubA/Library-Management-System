import { Routes, Route } from "react-router-dom";

import Statistics from "./Statistics";
import Profile from "./Profile";

import BookGallery from "./BookGallery";
import AdminInbox from "./AdminInbox";
import AdminBooks from "./AdminBooks";
import AdminBorrowing from "./AdminBorrowing";
import AdminUsers from "./AdminUsers";
import AdminAuthors from "./AdminAuthors";
import AdminPublishers from "./AdminPublishers";

import ProfilePasswordForm from "../layout/form/ProfilePasswordForm";
import ProfileForm from "../layout/form/ProfileForm";
import Navbar from "../layout/shared/Navbar";
import SideBar from "../layout/shared/Sidebar";
import MarginWrapper from "../layout/shared/MainWrapper";
import NotFound from "../layout/shared/NotFound";
import FooterSection from "../layout/shared/FooterSection";
import useSideBarPosition from "../hooks/useSideBarPosition";
// import UserCart from "./cart";
// import ProtectedRoute from "../components/common/protectedRoute";


const DashboardContainer = () => {
  const { footerRef, sideBarPosition } = useSideBarPosition()






  return (
    <>
      <Navbar />
      <div className="main relative mt-[70px]">
        <SideBar sideBarPosition={sideBarPosition} />
        <section className="p bg-slate-100 min-h-lvh h-full lg:ml-[16rem] md:ml-[12rem] sm:ml-[9rem]">
          <Routes>
            <Route index element={<Statistics />} />
            <Route path="/" element={<MarginWrapper />}>
              {/* <Route element={<ProtectedRoute />}> */}
              <Route path='inbox/*' element={<AdminInbox />} />
              <Route path='books/*' element={<AdminBooks />} />
              <Route path='users/*' element={<AdminUsers />} />
              <Route path='authors/*' element={<AdminAuthors />} />
              <Route path='borrowings/*' element={<AdminBorrowing />} />
              <Route path='publishers/*' element={<AdminPublishers />} />
              {/* </Route> */}
              <Route path='booksGallery/*' element={<BookGallery />} />
              <Route path='profile' element={<Profile />} />
              {/* <Route path='cart' element={<UserCart />} /> */}
              <Route path='profile/update' element={<ProfileForm />} />
              <Route path='profile/updatePassword' element={<ProfilePasswordForm />} />
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