import { useNavigate } from "react-router-dom";
import Button from "./_button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = ({ children, ...props }) => {

    const Navigate = useNavigate();
    return <Button  {...props} className="felx gap-5 justify-between" onClick={() => Navigate(-1)}>
        <span>
            <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <span>
            {children}
        </span>
    </Button>
}

export default BackButton;
