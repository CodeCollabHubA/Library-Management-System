import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./table.scss"

const Table = ({ children, resource, header,footer, tbodyStyle }) => {



    return (
        <>
            {
                resource ?
                    <div className="flex justify-between">
                        <h1 className="text-5xl font-semibold">{resource} list</h1>
                        {
                            resource !== "user" &&
                            <Link to="create" className="w-44 flex justify-center items-center bg-blue-700 text-white rounded-md">Add {resource}</Link>
                        }
                    </div>
                    : null
            }
            <div className=" relative overflow-x-auto ">
                <table className="capitalize w-full text-sm text-gray-500 ">
                    <thead className=" text-gray-700 bg-gray-50 ">
                        <tr className="">
                            {header.map((item, i) =>
                                <td key={i} scope="col" className={`${item?.style} px-6 py-3`}>
                                    {item?.name}
                                </td>
                            )}
                            <td className="px-6 py-3 w-10">actions</td>
                        </tr>
                    </thead>
                    <tbody className="w-full bg-white" >
                        {children ? children :
                            <td colSpan={4} className="bg-white text-center">
                                no request msg
                        </td>
                        }
                    </tbody>
                {footer ?
                    <tfoot className="text-gray-700 bg-gray-50">
                        <tr>
                            {footer.map((item ,i) =>
                                <td key={i} colSpan={4} className=" px-6 py-3">
                                    <div className="flex justify-between">
                                        <span>{item.span}</span>
                                        <span>
                                            <FontAwesomeIcon style={{ marginInline: '.5rem' }} icon={faArrowLeft} />
                                            <FontAwesomeIcon style={{ marginInline: '.5rem' }} icon={faArrowRight} />
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



