import * as fontAwesome from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const CardInfo = ({ OurService_items, button }) => {

    return (
        <>
            <div className="">For Admins:</div>
            <div className="block md:flex justify-center my-8">
                {Object.entries(OurService_items).map(([k_name, k_value]) => (
                    <div key={k_name} className="mx-auto flex flex-col my-5 md:mx-5 w-64 h-72 p-6 bg-white border 
                border-gray-200 rounded-lg shadow-lg ">
                        <div className="grow flex items-center">
                            <FontAwesomeIcon className="text-orange-800" icon={fontAwesome[k_value.admin.icon]} />
                            <Link href="#">
                                <h5 className="text-xl ms-3 font-bold 
                        tracking-tight text-orange-800">{k_name}</h5>
                            </Link>
                        </div>
                        <hr className="border-none h-[2px] bg-orange-800 w-12" /><hr />
                        <p className="mt-4 grow-[2] font-normal text-gray-700" dangerouslySetInnerHTML={{ __html: k_value.admin.content }}></p>
                        {button}
                    </div>
                ))}
            </div>
            <div className="">For Users:</div>
            <div className="block md:flex justify-center my-8">
                {Object.entries(OurService_items).map(([k_name, k_value]) => (
                    <div key={k_name} className="mx-auto flex flex-col my-5 md:mx-5 w-64 h-72 p-6 bg-white border 
                border-gray-200 rounded-lg shadow-lg ">
                        <div className="grow flex items-center">
                            <FontAwesomeIcon className="text-orange-800" icon={fontAwesome[k_value.admin.icon]} />
                            <Link href="#">
                                <h5 className="text-xl ms-3 font-bold 
                        tracking-tight text-orange-800">{k_name}</h5>
                            </Link>
                        </div>
                        <hr className="border-none h-[2px] bg-orange-800 w-12" /><hr />
                        <p className="mt-4 grow-[2] font-normal text-gray-700" dangerouslySetInnerHTML={{ __html: k_value.user.content }}></p>
                        {button}
                    </div>
                ))}
            </div>
        </>
    );
}

export default CardInfo;