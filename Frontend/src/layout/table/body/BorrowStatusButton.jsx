import Button from "../../../components/common/buttons/_button";
import { useMyContext } from "../../../context/ContextProvider";
import { createUpdateApi } from "../../../services/createUpdateDeleteApi";

const BorrowStatusButton = ({ item, item: { status } }) => {

    const myContext = useMyContext()
    const { setState, user: { userRole } } = myContext
    let statusActions = []

    if (status === "Pending") {
        if (userRole === "Admin") statusActions = ["Approve", "Reject"]
        if (userRole === "User") statusActions = ["Cancel"]
    }
    if (status === "Approved" && userRole === "User") statusActions = ["Confirm"]
    if (status === "Borrowed" && userRole === "Admin") statusActions = ["Return"]

    const handleClick = async (status) => {
        const form = {
            action: status,
            borrowingIds: [item.id]
        }
        if (confirm(`are you sure`)) {
            const res = await createUpdateApi({ myContext, setState, id: item.id, form, resource: "borrowing", operation: "update", method: "put" })
            console.log(res)
        }
    }


    return (
        <td>
            {statusActions.length === 0 ?
                status
                :
                statusActions.map(status =>
                    <Button
                        key={status}
                        onClick={() => handleClick(status)}
                    >{status}</Button>
                )}
        </td>
    )
}

export default BorrowStatusButton;
