import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faRefresh, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Table from "../table/Table";
import Button from "../../components/common/buttons/_button";
import InboxBody from '../table/body/inboxBody';


const MainInbox = ({ inboxHeader,inboxBody,inboxFooter,checked,handleChecked}) => {
    return (
        <>
            <div className="py-2 px-6 h-10">
                <Button type='checkbox' checked={checked} onClick={handleChecked} />
                <FontAwesomeIcon style={{ marginInline: '1rem' }} icon={faTrashCan} />
                <FontAwesomeIcon style={{ marginInline: '1rem' }} icon={faRefresh} />
                <FontAwesomeIcon style={{ marginInline: '1rem' }} icon={faEllipsisVertical} />
            </div>
            <Table header={inboxHeader} footer={inboxFooter}>
                <InboxBody body={inboxBody} checked={checked} />
            </Table>
        </>
    );
}
 
export default MainInbox;