import * as fontIcon from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { statusToIcon } from '../../../../utils/utils';
import Strong from './Strong';


const actions = (item) => {

    const text = {
        "Borrowed": `borrowed`,
        "Canceled": `Canceled the borrowing of`,
        "Pending": `requested to borrow the book`,
        "Confirmed": `Confirmed borrowing the book`,
        "Admin": {
            "Rejected": [`Rejected the borrowing request for`, `requested by user`],
            "Approved": [`Approved the borrowing request for`, `requested by user`],
            "Returned": [`Returned the book`, `borrowed by user`],
        }
    }

    const bookTitle = item.book.split(" ").slice(0, 2).join(" ");
    const isAdmin = item.userRole === "Admin";
    const isStandardStatus = ["Borrowed", "Canceled", "Pending", "Confirmed"].includes(item.status);

    return isStandardStatus ?
        <div>
            <span>{item.userRole}</span>
            <span>{" "}</span>
            <Strong>{item.user || item.admin}</Strong>
            <span>{" "}</span>
            <span>{text[item.status]}</span>
            <span>{" "}</span>
            <Strong>{bookTitle}</Strong>
        </div>
        : isAdmin ?
            <div>
                <span>{item.userRole}</span>
                <span>{" "}</span>
                <Strong>{item.admin}</Strong>
                <span>{" "}</span>
                <span>{text[item.userRole][item.status][0]}</span>
                <span>{" "}</span>
                <Strong>{bookTitle}</Strong>
                <span>{" "}</span>
                <span>{text[item.userRole][item.status][1]}</span>
                <span>{" "}</span>
                <Strong>{item.user}</Strong>
            </div>
            :
            <div>
                <span>{item.status}</span>
                <span>{item.userRole}</span>
                <span>{" "}</span>
                <Strong>{item.user}</Strong>
                <span>{" "}</span>
                <span>{text[item.userRole][item.status]}</span>
                <span>{" "}</span>
                <Strong>{bookTitle}</Strong>
            </div>

}
const Card = ({ item }) => {


    return (
        <li className="flex px-2">
            <div className={`w-9 h-9 my-2 mr-3 flex shrink-0 items-center justify-center rounded-full text-white bg-${item.status}`}>
                <FontAwesomeIcon icon={fontIcon?.[statusToIcon?.[item.status]]} />
            </div>
            <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                <div className="grow flex justify-between items-center">
                    <div className="self-center">
                        {actions(item)}
                    </div>
                    <div className="shrink-0 self-end ml-2">
                        <a className="capitalize font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">
                            details<span className="hidden sm:inline"> -&gt;</span>
                        </a>
                    </div>
                </div>
            </div>
        </li>
    )
}
export default Card