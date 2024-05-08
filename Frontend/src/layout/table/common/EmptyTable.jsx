import React from 'react';

const EmptyTable = ({ span }) => {
    return (
        <tr className='w-full'>
            <td colSpan={span} className="w-full px-6 py-4 text-center">no data</td>
        </tr>
    );
}

export default EmptyTable;
