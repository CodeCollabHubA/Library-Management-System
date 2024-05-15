import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMyContext } from "../../context/ContextProvider";
import { faBell, faHandHolding } from "@fortawesome/free-solid-svg-icons";

const NotificationIcon = () => {
    const { borrowingsActions } = useMyContext()

    const [show,setShow]=useState(false)
    const handleShow = () => {
        setShow(!show)
    }
    const notifyBox = "absolute right-0 w-[25rem] bg-white rounded-xl drop-shadow-xl  py-4 "
    return ( 
        <div  className="relative">
                                <FontAwesomeIcon onClick={handleShow} fontSize={'1.5rem'} icon={faBell} />
                                    {borrowingsActions?.length === 0 ? null :
                                        <span className="absolute -top-3 -left-3 -z-10 bg-red-600 text-sm font-bold text-white rounded-full w-5 h-5 flex items-center justify-center ">{ borrowingsActions.length}</span>
                                    }
                                    
                                    <div onClick={(e)=>e.stopPropagation()} className={show ? notifyBox : notifyBox + "hidden"}>
                                        {borrowingsActions.map(msg => (
                                        <div className="flex justify-between gap-4 items-center font-semibold h-16 px-4 my-1 hover:bg-slate-50 hover:text-[1.01rem] cursor-pointer transition-all ">
                                            <span className="circle flex justify-center items-start w-8 h-8 rounded-full bg-black ">
                                                <FontAwesomeIcon fontSize={"1.2rem"} color="white" icon={faHandHolding} />
                                            </span>
                                                <p className="grow">{ msg.userNavigation?.name}</p>
                                                <p className="bg-rose-700 text-white rounded-lg w-20 h-8 flex items-center justify-center ">{msg.status }</p>
                                            </div>
                                        )) } 
                                    </div>
                                </div>
     );
}
 
export default NotificationIcon;