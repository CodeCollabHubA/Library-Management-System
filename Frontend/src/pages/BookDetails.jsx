import Button from "../components/common/buttons/_button";


const book = {
    id: 1,
    title: "the black tulip",
    authors: "musab",
    publishers: "husam",
    numberOfCopiesOwned: 3,
    numberOfCopiesExist: 3,
    imageURL: "/src/assets/images/covers/1.jpeg",
    description: "description Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis omnis et aliquid, ipsum blanditiis aspernatur sint qui hic fugit corporis libero asperiores tenetur, quisquam quam quis eius iusto cum cumque.",
}

const BookDetail = () => {

    function handleClick() {
        alert("borrow")
    }

    return (
        <div>
            <h1 className="text-4xl font-semibold mb-10">{book.title}</h1>
            <div className='md:flex gap-5'>
                <div className="img w-full md:w-1/3 xl:w-1/4">
                    <img src={`${book.imageURL}`} alt={book.title} />
                </div>
                <div className="info flex-1">
                    <div className="row mb-5">
                        <h3 className="w-[100px] font-bold text-orange-800  flex justify-between">description <span className="text-right">:</span></h3>
                        <p className="text-justify">{book.description}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[100px] font-bold text-orange-800  flex justify-between">author <span className="text-right">:</span></h3>
                        <p className="flex-grw">{book.publishers}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[100px] font-bold text-orange-800  flex justify-between">publishDate <span className="text-right">:</span></h3>
                        <p className="flex-grw">2020</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[100px] font-bold text-orange-800  flex justify-between">copies <span className="text-right">:</span></h3>
                        <p className="flex-grw">{book.numberOfCopiesExist}</p>
                    </div>
                    <Button type="primary" className="mt-5" onClick={handleClick}>borrow for $2.00</Button>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;
