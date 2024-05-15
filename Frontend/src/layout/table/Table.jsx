import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./table.scss"
import Pagination from "./Pagination";
// import SearchAndFilter from "../../components/common/_searchAndFilter";
import SearchFilter from "./common/SearchFilter";


const Table = ({ children, resource, header, footer, tbodyStyle }) => {
    
    return (
        <>
            {resource ?
                <div className="flex justify-between">
                    <h1 className="text-5xl font-semibold">{resource} list</h1>
                    {
                        resource !== "user" &&
                        <Link to="create" className="w-44 flex justify-center items-center bg-blue-700 text-white rounded-md">Add {resource}</Link>
                    }
                <SearchFilter header={header} resource={resource} />
                </div>
                : null
            }
            <div className=" relative overflow-x-auto ">
                <table className="capitalize w-full text-sm text-gray-500 ">
                    <thead className=" text-gray-700 bg-gray-50 ">
                        <tr className="">
                            {header.map((item, i) =>
                                <td key={i} className={`${item?.style} px-6 py-3`}>
                                    {item?.label}
                                </td>
                            )}
                            <td className="px-6 py-3 w-10">actions</td>
                        </tr>
                    </thead>

                    <tbody className="w-full bg-white " >
                        {children ? children :
                            <td colSpan={4} className="bg-white h-fit text-center">
                                no request msg
                            </td>
                        }
                    </tbody>
                    {footer ?
                        <tfoot className="text-gray-700 bg-gray-50">
                            <tr>
                                {footer.map((item, i) =>
                                    <td key={i} colSpan={4} className=" px-6 py-3">
                                        <div className="flex justify-between">
                                            <span>{item.span}</span>
                                            <span>
                                            {/* <Pagination  /> */}
                                            </span>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        </tfoot>
                        : null
                    }
                </table >
            </div >
        </>

    );
}

export default Table;



