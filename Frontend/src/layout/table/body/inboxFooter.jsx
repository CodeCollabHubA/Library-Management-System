import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const InboxFooter = () => {
    return ( 
        <tfoot>
            <tr className="flex justify-between">
                <span>1 from 20</span>
                <span>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </span>
            </tr>
        </tfoot>
     );
}
 
export default InboxFooter;