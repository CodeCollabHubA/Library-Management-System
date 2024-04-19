import { Link } from "react-router-dom";

const Table = ({headerItems,bodyItems,editbuttonPath}) => {
    
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            {headerItems.map(item => (
                                <th key={item.id} scope="col" className="px-6 py-3">
                                    {item.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bodyItems.map(item => (
                            <tr key={item.id} className="bg-white border-b  hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</th>
                                <td className="px-6 py-4">{item.phone}</td>
                                <td className="px-6 py-4">{item.email}</td>
                                <td className="px-6 py-4">{item.status}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={editbuttonPath} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>

        </>
    )
}
 
export default Table;



