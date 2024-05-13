import ActionButtons from "../common/ActionButtons";
import EmptyTable from "../common/EmptyTable";

const User = ({ body, handleDelete }) => {


    return (
        <>
            {
                body?.length > 0 ?
                    body.map(item => (
                        <tr key={item?.id}>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.credit}</td>
                            <td>{item.userRole}</td>
                            <ActionButtons handleDelete={handleDelete} item={item} />
                        </tr>
                    ))
                    :
                    <EmptyTable length={7} />


            }
        </>
    );


}

export default User;