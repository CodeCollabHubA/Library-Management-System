import BookItem from "../books/BookItem";

let arr = [
    { id: 1, name: "book name1", author: "Ahmed Adam", publishDate: "2020", price: 2, img: "1.jpeg" },
    { id: 2, name: "book name2", author: "Ali Adam", publishDate: "2023", price: 2, img: "2.jpeg" },
    { id: 3, name: "book name3", author: "Ali Adam", publishDate: "2023", price: 2, img: "2.jpeg" },
    { id: 4, name: "book name4", author: "Adam J.", publishDate: "2021", price: 2, img: "3.jpeg" },
    { id: 5, name: "book name5", author: "David Adam", publishDate: "2022", price: 2, img: "2.jpeg" },
    { id: 6, name: "book name6", author: "David Adam", publishDate: "2022", price: 2, img: "2.jpeg" },
    { id: 7, name: "book name7", author: "Hassan ali", publishDate: "2022", price: 2, img: "3.jpeg" },
    { id: 8, name: "book name8", author: "David Adam", publishDate: "2020", price: 2, img: "1.jpeg" }
]
const Books = () => {
    return (
        <div className="mx-14 mt-10  mb-10 pt-5  pb-10 px-7 min-h-[80%] bg-white rounded-xl shadow-xl ">
            <div className="mb-10">
                <h1 className="text-5xl font-semibold">book list</h1>
            </div>
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                {arr.map(book =>
                    <BookItem key={book.id} id={book.id} name={book.name} author={book.author} publishDate={book.publishDate} price={book.price} img={book.img} />
                )}
            </div>
        </div>

    );
}

export default Books;
