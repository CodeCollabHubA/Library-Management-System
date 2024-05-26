import DoughnutChart from '../../../components/charts/DoughnutChart';
import { tailwindConfig } from '../../../utils/utils';

function Card({ className, data, label, title, cutout }) {

  const name = data.map(item => item.name) || []
  const count = data.map(item => item.count) || []

  const chartData = {
    labels: name,
    datasets: [
      {
        label,
        data: count,
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.rose[600],
          tailwindConfig().theme.colors.sky[400],
          tailwindConfig().theme.colors.violet[500],
          tailwindConfig().theme.colors.green[400],
          tailwindConfig().theme.colors.teal[200],
          tailwindConfig().theme.colors.slate[300],

        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.rose[900],
          tailwindConfig().theme.colors.sky[500],
          tailwindConfig().theme.colors.violet[700],
          tailwindConfig().theme.colors.green[500],
          tailwindConfig().theme.colors.teal[300],
          tailwindConfig().theme.colors.slate[600],

        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className={`flex flex-col bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 ${className}`}>
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="capitalize font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
      </header>
      <DoughnutChart data={chartData} cutout={cutout} width={389} height={260} />
    </div >
  );
}

export default Card;
