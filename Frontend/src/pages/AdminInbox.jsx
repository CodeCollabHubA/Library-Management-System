import InboxSidebar from "../layout/inbox/inboxSidebar";
import { useState } from "react";
import MainInbox from "../layout/inbox/mainInbox";
import RequestDetail from "../layout/inbox/requestDetail";
import { Route, Routes } from "react-router-dom";


const Inbox = () => {
    
    const inboxHeader = [
        {
            name: "Sender",
            style: ""
        },
        {
            name: "Subject",
            style: ""
        },
        {
            name: "Date",
            style: ""
        }];
    const inboxFooter = [
        {
            span: "1 of 50 pages",
        },
        
    ]
    const inboxBody = [
        {
            name: 'Shahad Ismail',
            subject: 'this user Asking for approve to his book borrow Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil atque doloribus consequuntur mollitia? Beatae, nemo fuga vero repudiandae quidem hic quibusdam illo harum, vitae aut quis earum, ea amet! Necessitatibus. ',
            date: '24-5-2024',
            Detail:''
        },
        {
            name: 'Ahmed Ismail',
            subject: 'this user Asking for approve to his book borrow Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil atque doloribus consequuntur mollitia? Beatae, nemo fuga vero repudiandae quidem hic quibusdam illo harum, vitae aut quis earum, ea amet! Necessitatibus. ',
            date: '24-5-2024',
            Detail:''
        },
        {
            name: 'Shatha Ismail',
            subject: 'this user Asking for approve to his book borrow Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil atque doloribus consequuntur mollitia? Beatae, nemo fuga vero repudiandae quidem hic quibusdam illo harum, vitae aut quis earum, ea amet! Necessitatibus. ',
            date: '24-5-2024',
            Detail:''
        },
        {
            name: 'Shyma Ismail',
            subject: 'this user Asking for approve to his book borrow Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil atque doloribus consequuntur mollitia? Beatae, nemo fuga vero repudiandae quidem hic quibusdam illo harum, vitae aut quis earum, ea amet! Necessitatibus. ',
            date: '24-5-2024',
            Detail:''
        },
    ]
    const handleDelete = () => {
        console.log('Deleted');
    }
    const [checked, setChecked]=useState(false)
    const handleChecked = () => {
        setChecked(!checked);
    }

    return (
        <div>
            <h1 className="text-5xl font-semibold">Inbox</h1>
            <div className="mt-12 rounded-md bg-slate-100 shadow-lg w-full">
                <div className="grid grid-cols-12">
                    <div className="col-span-1 xl:col-span-2">
                        <InboxSidebar />
                    </div>
                    <div className="col-span-11 xl:col-span-10">
                        <Routes>
                            <Route index element={<MainInbox inboxHeader={inboxHeader} inboxBody={inboxBody} inboxFooter={inboxFooter} checked={checked} handleChecked={handleChecked} />} />
                            <Route path=":id" element={<RequestDetail handleDelete={handleDelete} />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inbox;

