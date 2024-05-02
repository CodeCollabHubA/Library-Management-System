import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ open,onClose,children }) => {
    // const useHidden = hidden ? 'hidden' :''

    return (
        <div
            onClick={onClose}
            className={`z-30 fixed inset-1 flex justify-center items-center transition-colors
            ${open? 'visible bg-black/20':'invisible'}
            `}
        >
            <div
                onClick={(e)=>e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all
                        ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}    `}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-lg
                text-gray-400 bg-white hover:bg-gray-50">
                    <FontAwesomeIcon icon={faX} />
                </button>
                {children}
            </div>
        </div>
    );
}
 
export default Modal;