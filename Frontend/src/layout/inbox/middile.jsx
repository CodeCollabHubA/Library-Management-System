import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Middile = () => {
    return (
        <table className="w-full  h-[22rem] overflow-scroll ">
            <thead className="h-16 border-b-2 border-slate-50">
                <tr>
                    <th className="w-1/5 text-start"><input className="mx-2" type="checkbox" /> Sender</th>
                    <th className="w-3/5 text-start">Subject</th>
                    <th className="w-[12%] text-start">Date</th>
                </tr>
            </thead>
            <tbody className="" >
                <tr className="">
                    <td className="flex w-[10rem] h-[3rem] items-center">
                        <input type="checkbox" className="mx-2" />
                        <FontAwesomeIcon style={{ marginInline: '2px' }} fontSize={'1rem'} icon={faStar} />
                        <span className="text-base ">UserName</span>
                    </td>
                    <td className="">
                        Lorem word like thios coanot kllalo
                    </td>
                    <td className="">
                        25 nov 2024
                    </td>
                </tr>
                <tr className="">
                    <td className="flex w-[10rem] h-[3rem] items-center">
                        <input type="checkbox" className="mx-2" />
                        <FontAwesomeIcon style={{ marginInline: '2px' }} fontSize={'1rem'} icon={faStar} />
                        <span className="text-base ">UserName</span>
                    </td>
                    <td className="">
                        Lorem word like thios coanot kllalo
                    </td>
                    <td className="">
                        25 nov 2024
                    </td>
                </tr>
                <tr className="">
                    <td className="flex w-[10rem] h-[3rem] items-center">
                        <input type="checkbox" className="mx-2" />
                        <FontAwesomeIcon style={{ marginInline: '2px' }} fontSize={'1rem'} icon={faStar} />
                        <span className="text-base ">UserName</span>
                    </td>
                    <td className="">
                        Lorem word like thios coanot kllalo
                    </td>
                    <td className="">
                        25 nov 2024
                    </td>
                </tr>
                <tr className="">
                    <td className="flex w-[10rem] h-[3rem] items-center">
                        <input type="checkbox" className="mx-2" />
                        <FontAwesomeIcon style={{ marginInline: '2px' }} fontSize={'1rem'} icon={faStar} />
                        <span className="text-base ">UserName</span>
                    </td>
                    <td className="">
                        Lorem word like thios coanot kllalo
                    </td>
                    <td className="">
                        25 nov 2024
                    </td>
                </tr>
                <tr className="">
                    <td className="flex w-[10rem] h-[3rem] items-center">
                        <input type="checkbox" className="mx-2" />
                        <FontAwesomeIcon style={{ marginInline: '2px' }} fontSize={'1rem'} icon={faStar} />
                        <span className="text-base ">UserName</span>
                    </td>
                    <td className="">
                        Lorem word like thios coanot kllalo
                    </td>
                    <td className="">
                        25 nov 2024
                    </td>
                </tr>

            </tbody>
        </table>
    );
}

export default Middile;