import ActionCard from './common/ActionCard';


function Card({ data, className }) {


  return (
    <div className={`${className} bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700`}>
      <header className="capitalize px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">actions to take</h2>
      </header>

      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap text-left">
                  <div className="ml-[calc(3rem)] sm:ml-[calc(3.25rem)] font-semibold ">user</div>
                </th>
                <th className="p-2 whitespace-nowrap text-left">
                  <div className="font-semibold" >book title</div>
                </th>
                <th className="p-2 whitespace-nowrap text-left">
                  <div className="font-semibold" >status</div>
                </th>
                <th className="p-2 whitespace-nowrap text-center">
                  <div className="font-semibold" >action</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              <tr className='hover:bg-transparent hover:text-current cursor-default'>
                <td colSpan={4} className='px-0 py-2'>
                  <div className="uppercase rounded-sm text-slate-700 font-bold p-2">Today</div>
                </td>
              </tr>
              {data.slice(0, 2).map((item, i) => <ActionCard key={i} item={item} />)}
              <tr className='hover:bg-transparent hover:text-current cursor-default'>
                <td colSpan={4} className='px-0 py-2'>
                  <div className="uppercase rounded-sm text-slate-700 font-bold p-2">yesterday</div>
                </td>
              </tr>
              {data.slice(2, 6).map((item, i) => <ActionCard key={i} item={item} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Card;
