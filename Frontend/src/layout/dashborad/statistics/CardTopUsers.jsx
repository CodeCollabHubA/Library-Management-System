import Tooltip from '../../../components/Tooltip';
import UserCard from './common/UserCard';

const header = ["name", "email", "province", ["borrowings", "May"]]


function Card({ data, className }) {


  return (
    <div className={`${className} bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700`}>
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="capitalize font-semibold text-slate-800 dark:text-slate-100">top active users</h2>
        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">Based on borrowing activity in this month</div>
        </Tooltip>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                {header.map((item, i) =>
                  <th key={i} className="p-2 whitespace-nowrap text-left">
                    {i === 0 ?
                      <div className="ml-[calc(3rem)] sm:ml-[calc(3.25rem)] font-semibold ">{item}</div>
                      :
                      i === (header.length - 1) ?
                        <div className="font-semibold" >
                          <span>
                            {item[0]}
                          </span>
                          {" "}
                          <small>
                            ({item[1]})
                          </small>
                        </div>
                        :
                        <div className="font-semibold" >{item}</div>
                    }
                  </th>)}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {data?.map(item => <UserCard key={item.id} item={item} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}

export default Card;
