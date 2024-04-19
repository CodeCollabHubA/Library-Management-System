const CardInfo = ({OurService_items,button}) => {
    return (
        <>
            <div className="">For Admins:</div>
            <div className="flex justify-center my-8">
                {Object.entries(OurService_items).map(([k_name, k_value]) => (
                    <div key={k_name} className="flex flex-col mx-5 w-64 h-72 p-6 bg-white border 
                border-gray-200 rounded-lg shadow-lg ">
                        <div className="grow flex items-center">
                            <img src={k_value.admin.icon} alt="" />
                            <a href="#">
                                <h5 className="text-xl ms-3 font-bold 
                        tracking-tight text-orange-800">{k_name}</h5>
                            </a>
                        </div>
                        <hr className="border-none h-[2px] bg-orange-800 w-12" /><hr />
                        <p className="mt-4 grow-[2] font-normal text-gray-700" dangerouslySetInnerHTML={{ __html: k_value.admin.content }}></p>
                        {button}
                    </div>
                ))}
            </div>
            <div className="">For Users:</div>
            <div className="flex justify-center my-8">
                {Object.entries(OurService_items).map(([k_name, k_value]) => (
                    <div key={k_name} className="flex flex-col mx-5 w-64 h-72 p-6 bg-white border 
                border-gray-200 rounded-lg shadow-lg ">
                        <div className="grow flex items-center">
                            <img src={k_value.user.icon} alt="" />
                            <a href="#">
                                <h5 className="text-xl ms-3 font-bold 
                        tracking-tight text-orange-800">{k_name}</h5>
                            </a>
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