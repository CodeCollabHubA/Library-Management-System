import React from 'react';
import LineChart from '../../../components/charts/LineChartHour';
import { tailwindConfig } from '../../../utils/utils';
import Tooltip from '../../../components/Tooltip';



function Card({ className, data }) {

  const labels = data?.map(item => item.name) || []

  const count = data?.map(item => item.count) || []

  const chartData = {
    labels,
    datasets: [
      // Indigo line
      {
        label: 'Hours',
        data: count,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
    ],
  };

  return (
    <div className={`flex flex-col bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 ${className}`}>
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="capitalize font-semibold text-slate-800 dark:text-slate-100">24-Hour borrowing request insights</h2>
        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">Based on borrowing activity over all time</div>
        </Tooltip>
      </header>
      <LineChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default Card;
