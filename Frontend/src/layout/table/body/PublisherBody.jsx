import ActionButtons from "../common/ActionButtons";
import EmptyTable from "../common/EmptyTable";

const Publisher = ({ body, handleDelete }) => {


    return (
        <>
            {
                body?.length > 0 ?
                    body.map(item => (
                        <tr key={item?.id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <ActionButtons handleDelete={handleDelete} item={item} />
                        </tr>
                    ))
                    :
                    <EmptyTable length={4} />


            }
        </>
    )

}

export default Publisher;