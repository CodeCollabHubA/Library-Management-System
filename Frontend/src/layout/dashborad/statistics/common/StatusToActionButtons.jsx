import { statusToAction } from "../utils/utils";

const Buttons = ({ children }) => {
    return statusToAction?.Admin[children]?.map(element =>
        <span key={element.name}
            className={`grow text-center p-2 transition-all duration-300 cursor-pointer rounded-xl  border-2 border-transparent text-white hover:bg-transparent hover:text-${element.color} bg-${element.color} hover:border-${element.color}`}
        >{element.name}</span>
    )
}

export default Buttons;
