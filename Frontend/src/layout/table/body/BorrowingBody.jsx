import { dateFormater } from "../../../utils/utils";
import ActionButtons from "../common/ActionButtons";
import EmptyTable from "../common/EmptyTable";
import BorrowStatusButton from "./BorrowStatusButton";

const Borrowing = ({ body, handleDelete }) => {

  return body?.length > 0
    ?
    body.map((item) =>
      <tr key={item.id} >
        <td>{item.userNavigation?.name}</td>
        <td>{item.status}</td>
        <td>{item.bookNavigation?.title}</td>
        <td>{item.bookNavigation?.credit}</td>
        <td>{dateFormater(item.dueDate)}</td>
        <td>{dateFormater(item.dateOut)}</td>
        <td>{dateFormater(item.createdAt)}</td>
        <ActionButtons handleDelete={handleDelete} item={item} />
      </tr>
    )
    : <EmptyTable length={7} />
}

export default Borrowing;