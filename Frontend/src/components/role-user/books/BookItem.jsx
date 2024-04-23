import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import Button from "../Button";

const BookItem = ({ id, author, publishDate, price, img }) => {
    function handleClick() {
        alert("borrow")
    }
    return (
        <div className="card shadow-md" >
            <div className='overflow-hidden group aspect-[3/5] relative'>
                < img className='w-full h-full object-cover' src={`/src/assets/covers/${img}`
                } alt="1" />
                <div className='buttons w-[80%] left-[10%] transition-opacity duration-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 flex absolute bottom-3  justify-between'>
                    <Button type="primary" onClick={handleClick} className="hover:border-transparent">borrow</Button>
                    <Button type="primary" to={id} className="hover:border-transparent"><FontAwesomeIcon icon={faEye} /></Button>
                </div>
            </div >
            <div className='info p-2'>
                <p className="font-semibold">{author}</p>
                <div className="flex justify-between">
                    <p>
                        <span className="font-semibold capitalize">publish: </span>
                        <span>{publishDate}</span>
                    </p>
                    <p>${price.toFixed(2)}</p>
                </div>
            </div>
        </div >
    );
}

export default BookItem;
