import RecentCountsCard from './common/RecentCountsCard';


const header = ["resource", "count", "percentage"]


function Card({ data, className }) {

  const dataArray = Object.entries(data).map(([key, value]) => ({ resource: key, count: value.count, percentage: value.percentage }))


  return (
    <div className={`${className} bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700`}>
      <header className="capitalize px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="capitalize font-semibold text-slate-800 dark:text-slate-100">library operation insights</h2>
      </header>
      <div className="p-3">
        <div>
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Today
          </header>
          <ul className="my-1">
            {dataArray?.map((item, i) => <RecentCountsCard key={i} item={item} />)}
          </ul>
          <header className={`text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2`}>
            last week
          </header>
          <ul className="my-1">
            {dataArray?.map((item, i) => <RecentCountsCard key={i} item={item} />)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;
