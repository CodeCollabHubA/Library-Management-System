import Button from "../components/Button";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const BookItem = ({ id, author, publishDate, price, img }) => {
    return (
        <div className='card'>
            <div className='overflow-hidden group aspect-[3/5] relative'>
                <img className='w-full h-full object-cover' src={`/${img}`} alt="1" />
                <div className='buttons w-[80%] left-[10%] transition-opacity duration-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 flex absolute bottom-3  justify-between'>
                    <Button to={`../borrow/${id}`} className="hover:border-transparent">borrow</Button>
                    <Button to={id} className="hover:border-transparent"><FontAwesomeIcon icon={faEye} /></Button>
                </div>
            </div>
            <div className='info'>
                <p>{author}</p>
                <p>{publishDate}</p>
                <p>${price.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default BookItem;
