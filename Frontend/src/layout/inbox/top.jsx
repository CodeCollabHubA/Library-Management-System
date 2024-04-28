import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faRotateRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Top = () => {
    return (
        <div className="h-14 flex justify-between border-b-2 border-slate-50 ">
            <div id="options" className="mx-2 flex items-center  w-[10rem]">
                <input type="checkbox" className="me-2" />
                <FontAwesomeIcon style={{ marginLeft: '1rem' }} fontSize={'1.2rem'} icon={faTrashCan} />
                <FontAwesomeIcon style={{ marginLeft: '1rem' }} fontSize={'1.2rem'} icon={faRotateRight} />
                <FontAwesomeIcon style={{ marginLeft: '1rem' }} fontSize={'1.2rem'} icon={faEllipsis} />

            </div>
            <div className="searchBar mx-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <input type="search" id="default-search" className="text-base text-gray-900 border-none focus:ring-0 placeholder:text-gray-500 " placeholder="Search for users, requests..." />

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" strokeWidth="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4" />
                </svg>

            </div>
        </div>
    );
}

export default Top;