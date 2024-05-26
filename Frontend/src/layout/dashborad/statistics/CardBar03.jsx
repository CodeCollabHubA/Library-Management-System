import BarChart from '../../../components/charts/BarChartMonth';
import { tailwindConfig } from '../../../utils/utils';

function Card({ className, data }) {
  const labels = data.map(item => item.name)
  const counts = data.map(item => item.count)

  const chartData = {
    labels,
    datasets: [
      // Light blue bars
      {
        label: 'Users',
        data: counts,
        backgroundColor: tailwindConfig().theme.colors.blue[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className={`flex flex-col bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 ${className}`}>
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="capitalize font-semibold text-slate-800 dark:text-slate-100">Monthly New Users <small>(Last 12 Months)</small></h2>
      </header>
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default Card;
