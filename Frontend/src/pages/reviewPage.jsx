//this component for showing the full request borrow for the user, such as Cart 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/common/buttons/_button";



const UserReviewPage = () => {
    const items = [
        {
            title: 'THE CRIMENAL',
            author: 'Mohammed',
            cost: 45
        },
        {
            title: 'THE CRIMENAL',
            author: 'Mohammed',
            cost: 45
        },
        {
            title: 'THE CRIMENAL',
            author: 'Mohammed',
            cost: 45
        },
        {
            title: 'THE CRIMENAL',
            author: 'Mohammed',
            cost: 45
        },
    ]
    return (
        <>
            <div className="w-[70%]">
                <h1 className="font-semibold">Cart Items</h1>
                <hr  />
                {items.length!==0 ?
                    items?.map(item => (
                        <>
                            <div className="flex gap-8 my-3 mx-2 ">
                                <div className="w-16" role="button">
                                    <img src="https://m.media-amazon.com/images/I/81tBFlK3wVL._SY466_.jpg" alt="" />
                                </div>
                                <div className="grow">
                                    <h3>{item?.title}</h3>
                                    <p>THE AUTHOR : {item?.author}</p>
                                    <p>COST : {item?.cost} $</p>
                                </div>
                                <div className="flex items-center ">
                                    <FontAwesomeIcon color="tomato" fontSize={'1.5rem'} icon={faSquareMinus} />
                                </div>
                            </div>
                            <hr  />
                        </>
                    ))
                    :
                    <div>empty cart</div>
                }
                <div className="w-11/12 flex justify-between">
                    <h1 className="font-semibold">Total Cost :</h1>
                    <p className="font-semibold text-rose-700">49$</p>
                </div>
                <Button  className={"w-40 mt-6 bg-teal-800  hover:text-teal-800 hover:border-teal-800"}>Approve</Button>
            </div>
        </>
    );
}
 
export default UserReviewPage;