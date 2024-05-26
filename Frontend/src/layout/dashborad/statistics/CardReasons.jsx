import Tooltip from '../../../components/Tooltip';
import BarChart from '../../../components/charts/BarChartHorizantal';

import { tailwindConfig } from '../../../utils/utils';
import ColoredBgPercentage from './common/ColoredBgPercentage';


const colors = [
  ["indigo", 400, 600],
  ["indigo", 700, 900],
  ["rose", 600, 900],
  ["teal", 700, 900],
  ["sky", 400, 600],
  ["green", 400, 600],
  ["slate", 400, 600],
]

const Card = ({ data, className }) => {

  const labels = data?.map(item => item.name) || []
  const count = data?.map(item => item.count) || []
  const sum = count?.reduce((acc, curr) => acc + curr, 0)

  const datasets = colors.map(
    (_, i) => (
      {
        label: labels[i],
        data: [count[i]],
        backgroundColor: tailwindConfig().theme.colors[colors[i][0]][colors[i][1]],
        hoverBackgroundColor: tailwindConfig().theme.colors[colors[i][0]][colors[i][2]],
        // hoverBackgroundColor: tailwindConfig().theme.colors.teal,
      }
    ))

  const chartData = {
    labels: ['Reasons'],
    datasets,
  };


  return (
    <div className={`${className} bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700`}>
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="capitalize font-semibold text-slate-800 dark:text-slate-100">reason for borrowing rejection</h2>
        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">Based on borrowing activity this month</div>
        </Tooltip>
      </header>
      <div className="px-5 py-3 flex items-start">
        <span className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{sum}</span>
        <span className="text-sm font-semibold">
          <ColoredBgPercentage>{((Math.random() - 0.5) * 100).toFixed(1)}</ColoredBgPercentage>
        </span>
      </div>
      <div className="grow">
        <BarChart data={chartData} width={595} height={48} />
      </div>
    </div>
  );
}

export default Card;
