import Button from "../../components/role-user/Button";

let book = { id: 1, author: "Ahmed Adam", name: "book number 1", publishDate: "2020", price: 2, img: "1.jpeg", descriotion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore a explicabo iste pariatur! Dignissimos id eius error delectus repellat, consequatur nemo, totam, praesentium dolorem nisi sapiente voluptatibus est quaerat mollitia? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore a explicabo iste pariatur! Dignissimos id eius error delectus repellat, consequatur nemo, totam, praesentium dolorem nisi sapiente voluptatibus est quaerat mollitia?" }

const BookDetail = () => {

    function handleClick() {
        alert("borrow")
    }

    return (
        <div>
            <h1 className="text-4xl font-semibold mb-10">{book.name}</h1>
            <div className='md:flex gap-5'>
                <div className="img w-full md:w-1/3 xl:w-1/4">
                    <img src={`/src/assets/covers/${book.img}`} alt={book.name} />
                </div>
                <div className="info flex-1">
                    <div className="row mb-5">
                        <h3 className="w-[100px] font-bold text-orange-800  flex justify-between">descriotion <span className="text-right">:</span></h3>
                        <p className="text-justify">{book.descriotion}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[100px] font-bold text-orange-800  flex justify-between">author <span className="text-right">:</span></h3>
                        <p className="flex-grw">{book.author}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[100px] font-bold text-orange-800  flex justify-between">publishDate <span className="text-right">:</span></h3>
                        <p className="flex-grw">{book.publishDate}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[100px] font-bold text-orange-800  flex justify-between">descriotion <span className="text-right">:</span></h3>
                        <p className="flex-grw">${book.price.toFixed(2)}</p>
                    </div>
                    <Button type="primary" onClick={handleClick}>borrow for ${book.price.toFixed(2)}</Button>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;