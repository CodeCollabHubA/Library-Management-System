import StatusToActionButtons from "./StatusToActionButtons"


const ActionCard = ({ item }) => {
    return (
        <tr className='hover:bg-transparent hover:text-current cursor-default'>
            <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                        <img className="rounded-full" src={`/src/assets/images/profile/${item.userNavigation.imageURL}`} width="40" height="40" alt={item.name} />
                    </div>
                    <div className="font-medium text-slate-800 dark:text-slate-100">{item.userNavigation.name}</div>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                {item.bookNavigation.title.split(" ").slice(0, 3).join(" ")}
            </td>
            <td className="p-2 text-xs font-semibold whitespace-nowrap">
                <span className={`text-${item.status}`}>{item.status}</span>
            </td>
            <td className="p-2 text-center whitespace-nowrap">
                <div className="m-auto font-medium text-sm flex items-center gap-2 w-36">
                    <StatusToActionButtons>{item.status}</StatusToActionButtons>
                </div>
            </td>
        </tr>
    );
}

export default ActionCard;
