import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faEye } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/common/buttons/_button';
import Modal from '../../components/common/pupUpModal';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../context/ContextProvider';
import toast from 'react-hot-toast';






const BookItem = (props) => {
    const { id, imageURL, title, description, authors, publishers, credit, numberOfCopiesOwned, numberOfCopiesExist } = props;
    const { bag, setBag } = useMyContext()
    
    const toastStyle = {
        background: 'black',
        color:"white",
    }
    // console.log(props);
    const handleAddtoCart = (props) => {
        let exist = bag?.some(element=> element.id === props.id)
            
        if (exist) {
            toast("already added", {
                duration: 4000,
                // Styling
                style: toastStyle,
                // Custom Icon
            })
        } else {
            setBag([props, ...bag])
            toast("Added to the cart", {
                duration: 4000,
                // Styling
                style: toastStyle,
                // Custom Icon
                icon: '🛒',
            })
        }
    }
        

    const navigate = useNavigate()
    
    const handleGo = (id) => {
        navigate(`../books/${id}`, {
            state:
            {
                data: {
                    imageURL,
                    authors,
                    publishers,
                    title,
                    id,
                    description,
                    numberOfCopiesOwned,
                    numberOfCopiesExist,
                    credit
                }
            }
        });
    }
    
    return (
        <div className="card shadow-md" >
            <div className='overflow-hidden group aspect-[3/5] relative'>
                < img className='w-full h-full object-cover' src={`${imageURL}`} alt="1" />
                <div className='buttons w-[80%] left-[10%] transition-opacity duration-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 flex absolute bottom-3  justify-between'>
                    <Button type="primary" onClick={()=>handleAddtoCart(props)}
                        className="hover:border-transparent">
                        Add to cart
                    </Button>
                    <Button type="primary" onClick={()=>handleGo(id)}  className="hover:border-transparent"><FontAwesomeIcon icon={faEye} /></Button>
                </div>
            </div >

            <div className='info p-2'>
                <p className="font-semibold">{title}</p>
                <p className="font-semibold">{authors}</p>
                <div className="flex justify-between">
                    <p>
                        <span className="font-semibold capitalize">publisher: </span>
                        <span>{publishers}</span>
                    </p>
                    <p>{credit}</p>
                </div>
            </div>
        </div >
    );
}

export default BookItem;
