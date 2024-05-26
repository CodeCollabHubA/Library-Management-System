import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMyContext } from "../../context/ContextProvider";
import { faBell, faExclamation, } from "@fortawesome/free-solid-svg-icons";

const NotificationIcon = () => {
    const notifyBox = "absolute right-0 w-[25rem] bg-white rounded-xl drop-shadow-2xl py-4 "
    const { borrowingsActions } = useMyContext()

    const [show, setShow] = useState(false)
    const menuRef = useRef()
    useEffect(() => {
        let handle = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener("mousedown", handle)

        return () => {
            document.removeEventListener("mousedown", handle)
        }
    })

    return (
        <div className="relative" ref={menuRef}>
            <FontAwesomeIcon onClick={() => { setShow(!show) }} fontSize={'1.5rem'} icon={faBell} />
            {borrowingsActions?.length === 0 ? null :
                <span className="absolute -top-3 -left-3 -z-10 bg-red-600 text-sm font-bold
                                            text-white rounded-full w-5 h-5 flex items-center justify-center ">
                    {borrowingsActions.length}
                </span>
            }

            <div className={show ? notifyBox : 'hidden'} >
                {borrowingsActions.map(msg => (
                    <div key={msg.id} className="flex justify-between gap-4 items-center font-semibold
                                            h-16 px-4 my-1 hover:bg-slate-50 hover:text-[1.01rem] cursor-pointer transition-all ">
                        <span className="circle flex justify-center items-center w-8 h-8 rounded-full bg-slate-700 ">
                            <FontAwesomeIcon fontSize={"1.2rem"} color="white" icon={faExclamation} />
                        </span>
                        <p className="grow">{msg.userNavigation?.name}</p>
                        <p className="bg-rose-700 text-white rounded-lg w-20 h-8 flex items-center justify-center ">{msg.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationIcon;

// onClick={(e)=>e.stopPropagation()} className={show ? notifyBox : notifyBox + "hidden"}
// <FontAwesomeIcon icon={faCreditCard} />