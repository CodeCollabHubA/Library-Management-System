import { Link } from "react-router-dom";
const Books = () => {
    return ( 
        <div className="mx-14 bg-slate-100 rounded-xl shadow-xl min-h-80 ">
            <div className="py-5 px-7 flex justify-between">
                <h1 className="text-5xl font-semibold">Books</h1>
                <Link to={'dashboard/books/bookForm'} className="w-44 flex justify-center items-center bg-blue-700 text-white rounded-md">Add Book</Link>
            </div>

        </div>
     );
}
 
export default Books;