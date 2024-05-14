import ActionButtons from "../common/ActionButtons";
import EmptyTable from "../common/EmptyTable";

const Book = ({ body, handleDelete }) => {


    return (
        <>
            {
                body?.length > 0 ?
                    body.map(item => (
                        <tr key={item?.id} >
                            <td>{item.title}</td>
                            <td>{item.authors.map(author => `${author.name}, `)}</td>
                            <td>{item.publishers.map(publisher => `${publisher.name}, `)}</td>
                            <td>{item.credit}</td>
                            <td>{item.numberOfTotalCopies}</td>
                            <td>{item.numberOfAvailableCopies}</td>
                            <ActionButtons handleDelete={handleDelete} item={item} />
                        </tr>
                    ))
                    :
                    <EmptyTable length={7} />
            }
        </>
    )

}

export default Book;