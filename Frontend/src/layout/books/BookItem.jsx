import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faDragon, faEye } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/common/buttons/_button';
import Modal from '../../components/common/pupUpModal';






const BookItem = ({handleBorrow,open,setOpen,handleClose, id, imageURL, title, description, authors, publishers, credit, numberOfCopiesOwned, numberOfCopiesExist }) => {
    
    

    return (
        <div className="card shadow-md" >
            <div className='overflow-hidden group aspect-[3/5] relative'>
                < img className='w-full h-full object-cover' src={`${imageURL}`} alt="1" />
                <div className='buttons w-[80%] left-[10%] transition-opacity duration-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 flex absolute bottom-3  justify-between'>
                    <Button data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="primary" onClick={()=>setOpen(true)} className="hover:border-transparent">borrow</Button>
                    <Button type="primary" to={`../books/${id}`} className="hover:border-transparent"><FontAwesomeIcon icon={faEye} /></Button>
                </div>
            </div >
            <Modal open={open} onClose={handleClose} onClick={() => setOpen(false)}>
                <div className='text-center w-52'>
                    <FontAwesomeIcon fontSize={"3rem"} icon={faClipboardCheck} />
                    <div className='mx-auto my-4 w-48'>
                        <h3 className='text-lg font-black text-gray-800'>
                            Confirm Borrow</h3>
                        <p className='text-sm text-gray-500'>
                            Are you sure you want to borrow this book?
                        </p>
                    </div>
                    <div className='flex justify-between'>
                        <Button onClick={handleBorrow} type={'primary'}>
                            Confirm
                        </Button>
                        <Button onClick={handleClose} type={'info'}>
                            Cancle
                        </Button>
                    </div>
                </div>
            </Modal>
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
