import ActivityCard from './common/ActivityCard';


function Card({ data, className }) {

  return (
    <div className={`${className} bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700`}>
      <header className="capitalize px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Recent Activity</h2>
      </header>
      <div className="p-3">
        <div>
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Today
          </header>
          <ul className="my-1">
            {data?.slice(0, 4)?.map(item => <ActivityCard key={item.id} item={item} />)}
          </ul>
          <header className={`text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2`}>
            yesterday
          </header>
          <ul className="my-1">
            {data?.slice(4, 6)?.map(item => <ActivityCard key={item.id} item={item} />)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;
