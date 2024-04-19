import Table from '../components/common/table'
import { Link, Outlet } from "react-router-dom";
import BookForm from './bookForm';
import { Route,Routes } from 'react-router-dom';
const Books = () => {
    const header = [
        { name: 'User Name', id: 1 },
        { name: 'Phone', id: 2 },
        { name: 'Email', id: 3 },
        { name: 'Status', id: 4 },
        { name: "", id: 5 }
    ]
    const editbuttonPath='/dashboard'
    
    const body = [
        {
            id:1,
            name: 'mohamed',
            phone: '05050505',
            email: 'mrsom@gmail.com',
            status:'false'
        },
        {
            id:2,
            name: 'mohamed',
            phone: '05050505',
            email: 'mrsom@gmail.com',
            status:'false'
        },
        {
            id:3,
            name: 'mohamed',
            phone: '05050505',
            email: 'mrsom@gmail.com',
            status:'false'
        }
    ]
    return (
        <>
            <div className="mx-14 mt-20 pt-5 px-7 w-full  bg-white rounded-sm shadow-xl ">
                <div className="flex justify-between">
                    <h1 className="text-5xl font-semibold">Books</h1>
                    <Link to={'bookForm'} className="w-44 flex justify-center items-center bg-blue-700 text-white rounded-md">Add Book</Link>
                </div>
                <Routes>
                    <Route index element={<Table headerItems={header} bodyItems={body} editbuttonPath={editbuttonPath} />} />
                    <Route path='bookForm' element={<BookForm/>} />
                </Routes>
                
            </div>
            
        </>
    );
}

export default Books;
{/* <Outlet /> */}