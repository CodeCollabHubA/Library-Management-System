import { Link } from "react-router-dom";
import "./table.scss"
import Pagination from "./Pagination";
import SearchFilter from "./common/SearchFilter";


import { dateFormater } from "../../utils/utils";
import ActionButtons from "./common/ActionButtons";
import EmptyTable from "./common/EmptyTable";
import BorrowStatusButton from "./body/BorrowStatusButton";
import { useMyContext } from "../../context/ContextProvider";



const BorrowingActionTable = ({ handleDelete }) => {
    const header = ["user", "ActionButtons", "status", "Book Title", "Credit", "CreatedAt"]
    const { borrowingsActions } = useMyContext()

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-5xl font-semibold">Action list</h1>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                <table className="capitalize w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 bg-gray-50 ">
                        <tr>
                            {header.map((item, i) =>
                                <th key={i} scope="col" className="text-center px-6 py-3">
                                    {item}
                                </th>
                            )}
                            <th colSpan={2} className="text-center">actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowingsActions?.length > 0 ?
                            borrowingsActions.map((item) =>
                                <tr key={item.id} >
                                    <td>{item.userNavigation?.name}</td>
                                    <BorrowStatusButton item={item} />
                                    <td>{item.status}</td>
                                    <td>{item.bookNavigation?.title}</td>
                                    <td>{item.bookNavigation?.credit}</td>
                                    <td>{dateFormater(item.createdAt)}</td>
                                    <ActionButtons handleDelete={handleDelete} item={item} />
                                </tr>)
                            :
                            <EmptyTable span={7} />}
                    </tbody>
                </table >
            </div >
        </>

    )
}

export default BorrowingActionTable;
