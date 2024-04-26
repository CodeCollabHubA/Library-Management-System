import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faInbox, faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/role-user/Button";


const InboxSidebar = () => {
    const items = [
        {icon:<FontAwesomeIcon style={{marginInline:'1rem'}} icon={faInbox} />,name:"Inbox"},
        {icon:<FontAwesomeIcon style={{marginInline:'1rem'}} icon={faStar} />,name:"Started"},
        {icon:<FontAwesomeIcon style={{marginInline:'1rem'}} icon={faBell} />,name:"Borrows"},

    ]
    
    return ( 
        <>
            <Button className='w-full h-12' type="primary" children="Compose"/>
            <ul>
                {items.map(item => (
                    <li  className="text-lg my-5 text-gray-600 flex items-center rounded-md h-10 cursor-pointer hover:bg-blue-200   ">
                        {item.icon}{item.name}
                    </li>
                )) }
            </ul>
        </>
     );
}
 
export default InboxSidebar;