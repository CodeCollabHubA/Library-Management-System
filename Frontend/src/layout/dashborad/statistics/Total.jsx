import { formatNumber } from "../../../utils/utils";

function Card({ className, Icon, total, title1 }) {


  return (
    <div className={`${className} flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700`}>
      <div className="p-5">
        <header className="flex justify-between items-start mb-2">
          <img src={Icon} width="32" height="32" alt="Icon 02" />
        </header>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{formatNumber(total)}</div>
        </div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{title1}</h2>
      </div>
    </div>
  );
}

export default Card;
