import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/buttons/_button";

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
            
                <h1 className="text-3xl mb-8">Request Details</h1>
                <h3 className="text-xl my-4">{name}</h3>
                <p className="my-4">{subject}</p>
                <p className="my-4">{date}</p>
                <div className="mx-auto mt-14 flex justify-around">
                    <Button onClick={handleConfirmBorrowing} type={'primary'} className={"w-40"}>Confirm Borrowing</Button>
                    <Button onClick={handleBack} className={"w-40 "}>Back</Button>
                </div>
            </div>
        </>
    );
}
 
export default RequestDetail;