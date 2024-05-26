import BarChart from '../../../components/charts/BarChartMonth';
import { tailwindConfig } from '../../../utils/utils';

function Card({ className, data }) {

  const males = data?.males?.map(item => item.count) || []
  const females = data?.females?.map(item => item.count) || []
  const dates = data?.females?.map(item => item.name) || []

  const chartData = {
    labels: dates,
    datasets: [
      // Light blue bars
      {
        label: 'Males',
        data: males,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Females',
        data: females,
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className={`flex flex-col bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 ${className}`}>
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="capitalize font-semibold text-slate-800 dark:text-slate-100">borrowings by gender <small>(last 6 months)</small></h2>
      </header>
      <BarChart data={chartData} width={595} height={248} />
    </div >
  )
}

export default Card;
