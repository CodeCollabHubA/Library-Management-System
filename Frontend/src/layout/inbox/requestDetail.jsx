import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/buttons/_button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const RequestDetail = () => {
    const location = useLocation();
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate(-1)
    }
    const handleConfirmBorrowing = () => {
        console.log('clg');
    }
    const receivedData = location.state?.data;
    const {name,subject,date}=receivedData
    return (
        <>
            <div className="bg-white mx-auto my-6 p-10 text-center min-h-[20rem] w-[95%] rounded-md">
                <Button onClick={handleBack} className={'absolute flex items-center justify-evenly w-20 bg-teal-950 hover:text-teal-950 hover:border-teal-950 '}> <FontAwesomeIcon icon={faArrowLeft} /> Back</Button>
                <h1 className="text-3xl mb-8">Request Details</h1>
                <h3 className="text-xl my-4">{name}</h3>
                <p className="my-4">{subject}</p>
                <p className="my-4">{date}</p>
                <div className="mx-auto mt-14 flex justify-around ">
                    <Button onClick={handleConfirmBorrowing}  className={"w-40 bg-teal-800  hover:text-teal-800 hover:border-teal-800"}>Approve</Button>
                    <Button onClick={handleConfirmBorrowing} className={"w-40 bg-rose-700 hover:text-rose-700 hover:border-rose-700"}>Reject</Button>
                </div>
            </div>
        </>
    );
}
 
export default RequestDetail;