import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faInbox, faStar } from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/common/buttons/_button";

const InboxSidebar = () => {
    const items = [
        { icon: faInbox , name: "Inbox" },
        { icon: faStar , name: "Started" },
        { icon: faBell , name: "Borrows" },

    ]

    return (
        <>
            <Button className='w-full h-12' type="primary" children="Compose" />
            <ul>
                {items.map(item => (
                    <li className="text-lg my-5 text-gray-600 flex items-center rounded-md h-10 cursor-pointer hover:bg-blue-200   ">
                        <FontAwesomeIcon style={{ marginInline: '1rem' }} icon={item.icon} />
                        {item.name}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default InboxSidebar;