import ActionButtons from "../common/ActionButtons";
import EmptyTable from "../common/EmptyTable";

const Author = ({ body, handleDelete }) => {

    return (
        <tbody>
            {
                body?.length > 0 ?
                    body.map(item => (
                        <tr key={item?.id} >
                            <td>{item.name}</td>
                            <ActionButtons handleDelete={handleDelete} item={item} />
                        </tr>
                    ))
                    :
                    <EmptyTable length={1} />

            }
        </tbody>)

}


export default Author;