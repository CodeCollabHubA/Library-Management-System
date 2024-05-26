import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fontIcon from '@fortawesome/free-solid-svg-icons';

import ColoredTextPercentage from './ColoredTextPercentage';
import { formatNumber, resourceToIcon } from '../../../../utils/utils';
import Strong from './Strong';



const UserCard = ({ item }) => {
    return (
        <li className="flex items-center gap-3 px-2">
            <div className={`w-9 h-9 my-2 flex shrink-0 items-center justify-center rounded-full text-white bg-blue-500`}>
                <FontAwesomeIcon icon={fontIcon[resourceToIcon[item.resource]]} />
            </div>
            <div className="capitalize grow flex justify-between border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                <div>
                    <span className="inline-block w-12 font-medium text-sm text-right">{formatNumber(item.count)}</span>
                    <span className="ml-3">{resourcetoMessage(item.resource)}</span>
                </div>
                <div>
                    <span className="ml-2 font-medium">
                        <ColoredTextPercentage>{formatNumber(item.percentage)}</ColoredTextPercentage>
                    </span>
                </div>
            </div>
        </li>
    );
}


const resourcetoMessage = (resource) => {
    const temp = {
        "Book": "have been added to the library",
        "User": "have been registered",
        "Borrowing": "requests have been processed",
    }
    return <>
        {
            resource === "Borrowing" ?
                <>
                    <Strong>{resource}</Strong>
                </>
                :
                <>
                    <span>New </span>
                    <Strong>{resource}s</Strong>
                </>
        }
        <span>{" "}</span>
        <span>
            {temp[resource]}
        </span>
    </>
}

export default UserCard;
