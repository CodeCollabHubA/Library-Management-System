import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faInbox, faPen, faStar } from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/common/buttons/_button";
import { useEffect, useState } from "react";

const InboxSidebar = () => {
    const items = [
        {id:1, icon: faInbox , name: "Inbox" },
        {id:2, icon: faStar , name: "Started" },
        {id:3, icon: faBell , name: "Borrows" },

    ]
    const pageWidth = window.innerWidth<1100

    return (
        <div className="bg-white lg:min-h-[15rem] pt-4 rounded-md ">
            <Button className='mx-auto xl:w-[75%] h-10 xl:h-12' type="primary" children={(pageWidth)?<FontAwesomeIcon icon={faPen}/>:"Compose"} />
            <ul className="my-4">
                {items.map(item => (
                    <li key={item.id} className=" h-12 flex items-center cursor-pointer hover:bg-blue-200 hover:text-[1.11rem] transition-all duration-300 ">
                        <FontAwesomeIcon style={{ marginInline: "1rem" }} icon={item.icon} />
                        <span className="hidden xl:block">{ item.name }</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InboxSidebar;