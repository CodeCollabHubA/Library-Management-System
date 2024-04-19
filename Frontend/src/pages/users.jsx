import { Link } from "react-router-dom";
import Table from "../components/common/table";

const Users = () => {
    const header = [{name:'User Name',id:1}, {name:'Phone',id:2}, {name:'Email',id:3}, {name:'Status',id:4},{name:"",id:5}]
    const editbuttonPath='/dashboard'
    const users = [
        {
            name: 'som3a',
            phone: '566',
            email: 'erih@hotmail.com ',
            status:'true'
        },
        {
            name: 'som3a',
            phone: '566',
            email: 'erih@hotmail.com ',
            status:'true'
        },
        {
            name: 'som3a',
            phone: '566',
            email: 'erih@hotmail.com ',
            status:'true'
        },
    ]
    return ( 
        <>
            <div className="mx-14 mt-20 pt-5 px-7 w-full bg-white rounded-sm shadow-xl ">
                <div className="flex justify-between">
                    <h1 className="text-5xl font-semibold">Users</h1>
                    <Link to='/dashboard' className="w-44 flex justify-center items-center bg-blue-700 text-white rounded-md">Show requests</Link>
                </div>
            <Table bodyItems={users} headerItems={header} editbuttonPath={editbuttonPath} />
            </div>
        </>
     );
}
 
export default Users;