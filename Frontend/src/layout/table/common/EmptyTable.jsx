import React from 'react';

const EmptyTable = ({ length }) => {
    return (
        <tr className='w-full'>
            <td className="w-full px-6 py-4 text-center">no data</td>
        </tr>
    );
}

export default EmptyTable;
