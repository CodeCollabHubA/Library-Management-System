import { dateFormater } from "../../../utils/Utils";
import ActionButtons from "../common/ActionButtons";
import EmptyTable from "../common/EmptyTable";

const Borrowing = ({ body, handleDelete }) => {



    return (
        <>
            {
                body?.length > 0 ?
                    body.map((item, i) =>
                        Array.from({ length: item.bookBorrowings?.length }, (_, index) =>
                            <tr key={`${i} ${index}`} >
                                <td>{item.userId}</td>
                                <td>{item.bookBorrowings[index].bookNavigation.title}</td>
                                <td>{item.bookBorrowings[index].isReturned ? "yes" : "no"}</td>
                                <td>{item.bookBorrowings[index].bookNavigation.credit}</td>
                                <td>{item.dueDate}</td>
                                <td>{item.dateOut}</td>
                                <ActionButtons handleDelete={handleDelete} item={item} />
                            </tr>
                        ))

                    :
                    <EmptyTable length={7} />
            }
        </>
    )

}

export default Borrowing;