import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/buttons/_button";
import ActionButtons from "../common/ActionButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const InboxBody = ({ body,checked }) => {
    const navigate=useNavigate()
    const handleNavigate = (id,name,subject,date) => { 
        navigate(`../inbox/${name}`, {
            state:
            {
                data:
                {
                    id,
                    name,
                    subject,
                    date,
                }
            }
        });
    }
    return (
        <>
            {
                body?.length > 0 ?
                    body.map(item => (
                        <tr key={item?.id}>
                            <td className="max-w-36 ">{checked ? <Button type='checkbox' checked={checked} /> : <Button type='checkbox' />}
                                <FontAwesomeIcon style={{marginInline:'.2rem'}} icon={faStar} />{item.name}
                            </td>
                            <td className="max-w-56 xl:max-w-96">
                                {item.subject}
                            </td>
                            <td>
                                {item.date}
                            </td>
                            <td>
                                <Button type={'green'} onClick={()=>handleNavigate(item.id,item.name,item.subject,item.date)}>details</Button>
                            </td>
                        </tr>
                    ))
                    :
                    <EmptyTable length={4} />
            }
        </>
    )

}
 
export default InboxBody;