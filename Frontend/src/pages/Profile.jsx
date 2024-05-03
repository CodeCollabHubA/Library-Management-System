import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/common/buttons/_button";
import { useMyContext } from "../context/ContextProvider";
import { faCircleCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Profile = () => {
    const { user = {} } = useMyContext()
    const [approved,setApproved]=useState(false)
    const img = '/src/assets/images/profile/profilePicture.jpg'

    return (
        <div className="grid grid-cols-2 gap-10 min-h-[30rem]">
            <div className="bg-slate-100 drop-shadow-2xl rounded-2xl p-6 ">
                <div className=" h-[13rem] p-4">
                    <img src={img} alt={user?.name} className="w-full h-full object-cover" />
                </div>
                <div className='grid gap-2 '>
                    <h1 className="font-semibold">MOHAMMED ISMAIL</h1>
                    <h2 className="font-semibold">bio</h2>
                    <p className="text-justify">
                        SoftwareEngineer | FrontendDeveloper | React.js 
                    </p>
                    <hr className="mb-2 border-1 border-black" />
                    <h2 className="font-semibold flex justify-between">email</h2>
                    <p className="text-justify">
                        moahmed@gmail.com
                    </p>
                    <hr className="mb-2 border-1 border-black" />

                    <Button className={'w-full'} type={'green'} children={'Update Profile'} />
                </div>

            </div>
            <div className="grid gap-6">
                <div className="bg-slate-100 drop-shadow-2xl rounded-2xl p-6">
                    <div className="grid gap-2">
                        <h2 className="font-semibold">Phone</h2>
                        <p>0522477326</p>
                        <hr className="mb-2 border-1 border-black" />
                        <h2 className="font-semibold">Address</h2>
                        <p>Nahda/Sharjah</p>
                        <hr className="mb-2 border-1 border-black" />
                        <h2  className="font-semibold">Favorit Authors</h2>
                    </div>
                </div>
                <div className="bg-slate-100 drop-shadow-2xl rounded-2xl p-6">
                    <div className="grid gap-2">
                        <h2 className="font-semibold text-xl">Credit</h2>
                        <div className="flex justify-between items-center">
                            <p className="text-green-600 text-md font-bold">24 Credits</p>
                            <Button className={'bg-cyan-800'} children={'get more'}/>
                       </div>
                        <hr className="mb-2 border-1 border-black" />
                        <div className="flex justify-evenly items-center ">
                            <h2 className="font-bold underline">Approved Account</h2>
                            <FontAwesomeIcon fontSize={'1.2rem'} style={approved?{color:'green'}:{color:'tomato'}} icon={approved? faCircleCheck : faCircleExclamation} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;


{/* <h1 className="text-4xl font-semibold ">{user?.name}</h1>
            <div className="md:flex md:gap-10">
                <div className="info flex-1">
                    <div className="row mb-5">
                        <h3 className="w-[70px] font-bold text-blue-700  flex justify-between">bio <span className="text-right">:</span></h3>
                        <p className="text-justify">{user?.bio}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[70px] font-bold text-blue-700  flex justify-between">email <span className="text-right">:</span></h3>
                        <p className="flex-grw">{user?.email}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[70px] font-bold text-blue-700  flex justify-between">address <span className="text-right">:</span></h3>
                        <p className="flex-grw">{user?.address}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[70px] font-bold text-blue-700  flex justify-between">phone <span className="text-right">:</span></h3>
                        <p className="flex-grw">{user?.phone}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[70px] font-bold text-blue-700  flex justify-between">address <span className="text-right">:</span></h3>
                        <p className="flex-grw">{user?.address}</p>
                    </div>
                    <Button to="update" className="mt-5">Update Profile</Button>
                </div>

                <div className="w-1/2 md:w-1/3 xl:w-1/4">
                    <div className="overflow-hidden w-full aspect-[1/1]">
                        <img src={user?.img} alt={user?.name} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div> */}