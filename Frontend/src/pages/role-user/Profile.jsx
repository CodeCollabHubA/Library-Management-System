import Button from "../../components/role-user/Button";

let user = {
    id: 1, name: "user number 1", address: "address st. apartment 20, cairo", email: "user@example.com", phone: "+201027677192", img: "2.jpeg", bio: "I'am Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto optio consequuntur odio delectus, voluptate ea quasi odit ipsam."
}
const Profile = () => {

    return (
        <div>
            <h1 className="text-4xl font-semibold ">{user.name}</h1>
            <div className="md:flex md:gap-10">
                <div className="info flex-1">
                    <div className="row mb-5">
                        <h3 className="w-[70px] font-bold text-blue-700  flex justify-between">bio <span className="text-right">:</span></h3>
                        <p className="text-justify">{user.bio}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[70px] font-bold text-blue-700  flex justify-between">email <span className="text-right">:</span></h3>
                        <p className="flex-grw">{user.email}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[70px] font-bold text-blue-700  flex justify-between">address <span className="text-right">:</span></h3>
                        <p className="flex-grw">{user.address}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[70px] font-bold text-blue-700  flex justify-between">phone <span className="text-right">:</span></h3>
                        <p className="flex-grw">{user.phone}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[70px] font-bold text-blue-700  flex justify-between">address <span className="text-right">:</span></h3>
                        <p className="flex-grw">{user.address}</p>
                    </div>
                    <Button to="update">Update Profile</Button>
                </div>

                <div className="img w-full md:w-1/3 xl:w-1/4">
                    <img src={`/src/assets/profile.jpg`} alt={user.name} />
                </div>
            </div>
        </div>
    );
}

export default Profile;
