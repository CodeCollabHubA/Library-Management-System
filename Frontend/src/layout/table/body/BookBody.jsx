import ActionButtons from "../common/ActionButtons";
import EmptyTable from "../common/EmptyTable";

const Book = ({ body, handleDelete }) => {

    return (
        <tbody>
            {
                body?.length > 0 ?
                    body.map(item => (
                        <tr key={item?.id} >
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.authors.map(author => `${author.name}, `)}</td>
                            <td>{item.publishers.map(publisher => `${publisher.name}, `)}</td>
                            <td>{item.credit}</td>
                            <td>{item.numberOfCopiesOwned}</td>
                            <td>{item.numberOfCopiesExist}</td>
                            <ActionButtons handleDelete={handleDelete} item={item} />
                        </tr>
                    ))
                    :
                    <EmptyTable length={6} />
            }
        </tbody>
    )

}

export default Book;