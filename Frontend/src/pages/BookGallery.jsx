import SearchAndFilter from "../components/common/_searchAndFilter";
import { useMyContext } from "../context/ContextProvider";
import BookItem from "../layout/books/BookItem";
import EmptyTable from "../layout/table/common/EmptyTable";


const BookGallery = () => {

    const { books = [] } = useMyContext()

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-5xl font-semibold mb-10">book list</h1>
                <SearchAndFilter />
            </div>
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                {books?.length > 0 ?
                    books.map(book =>
                        <BookItem
                            key={book?.id}
                            id={book?.id}
                            imageURL={book.imageURL}
                            title={book.title}
                            description={book.description}
                            authors={book.authors.map(author => `${author.name}, `)}
                            publishers={book.publishers.map(publisher => `${publisher.name}, `)}
                            credit={book.credit}
                            numberOfCopiesOwned={book.numberOfCopiesOwned}
                            numberOfCopiesExist={book.numberOfCopiesExist}
                        />
                    )
                    :
                    <EmptyTable bookGallary={true} span={6} />
                }
            </div>
        </div>
    );
}

export default BookGallery;
