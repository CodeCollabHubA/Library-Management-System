import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const Bottom = () => {
    return (
        <div className="h-12 py-2 px-4 items-center border-t-2 border-slate-50 w-full flex justify-between">
            <span>1-5 of 29</span>
            <div className="flex me-8">
                <FontAwesomeIcon style={{ marginInline: '.5rem' }} fontSize={'1.8rem'} icon={faCaretLeft} />
                <FontAwesomeIcon style={{ marginInline: '.5rem' }} fontSize={'1.8rem'} icon={faCaretRight} />
            </div>
        </div>
    );
}

export default Bottom;
