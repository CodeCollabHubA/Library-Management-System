import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/buttons/_button";
import Modal from "../components/common/pupUpModal";


const book = {
    numberOfCopiesOwned: 3,
    numberOfCopiesExist: 3,
    description: "description Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis omnis et aliquid, ipsum blanditiis aspernatur sint qui hic fugit corporis libero asperiores tenetur, quisquam quam quis eius iusto cum cumque.",
}

const BookDetail = () => {

    const location = useLocation();
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate(-1)
    }

    const receivedData = location.state?.data;
    console.log(receivedData);
    function handleClick() {
        alert("borrow")
    }
    const {title,imageURL,publishers,authors}=receivedData
    return (
        <div>
            <Modal />
            <div className="flex justify-between mb-10">
                <h1 className="text-3xl font-semibold">{title}</h1>
                <Button className={'h-fit w-24'} onClick={ handleBack} >Back</Button>
            </div>
            <div className='md:flex gap-5'>
                <div className="img w-full md:w-1/3 xl:w-1/4">
                    <img src={`${imageURL}`} alt={book.title} />
                </div>
                <div className="info flex-1">
                    <div className="row mb-5">
                        <h3 className="w-[100px] font-bold text-orange-800  flex justify-between">description <span className="text-right">:</span></h3>
                        <p className="text-justify">{book.description}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[100px] font-bold text-orange-800  flex justify-between">author <span className="text-right">:</span></h3>
                        <p className="flex-grw">{authors}</p>
                    </div>
                    <div className="flex gap-5">
                        <h3 className="w-[100px] font-bold text-orange-800  flex justify-between">publisher <span className="text-right">:</span></h3>
                        <p className="flex-grw">{publishers}</p>
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
