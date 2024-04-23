import React from 'react';
import { Outlet } from 'react-router-dom';

const MainWrapper = () => {
    return (
        <div className='py-7 px-7'>
            <div className='py-7 px-7 bg-white rounded-sm shadow-xl'>
                <Outlet />
            </div>
        </div>
    );
}

export default MainWrapper;
