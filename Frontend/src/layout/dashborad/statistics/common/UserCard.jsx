import { formatNumber } from '../../../../utils/utils';
import ColoredTextPercentage from './ColoredTextPercentage';

const UserCard = ({ item }) => {

    return (
        <tr>
            <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                        <img className="rounded-full" src={`/src/assets/images/profile/${item.imageURL}`} width="40" height="40" alt={item.name} />
                    </div>
                    <div className="font-medium text-slate-800 dark:text-slate-100">{item.name}</div>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                {item.email}
            </td>
            <td className="p-2 whitespace-nowrap">
                {item.address}
            </td>
            <td className="whitespace-nowrap">
                <div className="font-medium text-sm flex items-center gap-2">
                    <span className='w-8 text-right'>{formatNumber(item?.count)}</span>
                    {" "}
                    <span className='w-8 text-right text-xs'>
                        <ColoredTextPercentage>{formatNumber(item?.percentage)}</ColoredTextPercentage>
                    </span>
                </div>
            </td>
        </tr>
    );
}

export default UserCard;
