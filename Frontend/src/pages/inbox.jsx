import Loans from "../components/loans/loans";
import Borrows from "../components/borrows/borrows";
import { Route, Routes } from "react-router-dom";
import Table from "../components/common/table";
import Top from "./inbox/top";
import Middile from "./inbox/middile";
import Bottom from "./inbox/bottom";
import InboxSidebar from "./inbox/inboxSidebar";

const Inbox = () => {
    return (
        <>
            <div className="mx-14 mt-20 pt-5 px-7 w-full  bg-white rounded-sm shadow-xl ">
                <div className="flex flex-col justify-between">
                    <h1 className="text-5xl font-semibold">Inbox</h1>
                    <div className="mt-12   rounded-md bg-slate-100 shadow-lg w-full">
                        <Routes>
                            <Route index element={
                                <div className="flex h-[29rem]">
                                    <div className="w-1/5 p-2 border-r-2 border-slate-50">
                                        <InboxSidebar />
                                    </div>
                                    <div className="w-full">
                                        <Top />
                                        <Middile />
                                        <Bottom />
                                    </div>
                                </div>
                            
                            } />
                            <Route path="loans/*" element={<Loans />} />
                            <Route path="borrows/*" element={<Borrows />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Inbox;

