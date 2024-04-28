import Button from "../components/common/buttons/_button";
import { useMyContext } from "../context/ContextProvider";


const Profile = () => {
    const { user = {} } = useMyContext()


    return (
        <div>
            <h1 className="text-4xl font-semibold ">{user?.name}</h1>
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
            </div>
        </div>
    );
}

export default Profile;
