import { Chart } from 'react-google-charts';
import { tailwindConfig } from '../../../utils/utils';


const geoData = (data) => ([
    ['Province', 'Borrowings'],
    [{ v: 'AE-AZ', f: 'Abu Dhabi' }, data['AE-AZ'] || 0],
    [{ v: 'AE-AJ', f: 'Ajman' }, data['AE-AJ'] || 0],
    [{ v: 'AE-FU', f: 'Fujairah' }, data['AE-FU'] || 0],
    [{ v: 'AE-SH', f: 'Sharjah' }, data['AE-SH'] || 0],
    [{ v: 'AE-DU', f: 'Dubai' }, data['AE-DU'] || 0],
    [{ v: 'AE-RK', f: 'Ras Al Khaimah' }, data['AE-RK'] || 0],
    [{ v: 'AE-UQ', f: 'Umm Al Quwain' }, data['AE-UQ'] || 0]
]);

const options = {
    region: 'AE',
    displayMode: 'regions',
    resolution: 'provinces',
    colorAxis: { colors: [tailwindConfig().theme.colors.slate[300], tailwindConfig().theme.colors.sky[500]] },
    datalessRegionColor: tailwindConfig().theme.colors.slate[50],
}

function GeoChart({ className, data, width, height }) {

    return (
        <div className={`flex flex-col bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 ${className}`}>
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="capitalize font-semibold text-slate-800 dark:text-slate-100">Top UAE Provinces by Borrowing request</h2>
            </header>
            <div>
                <Chart
                    chartType="GeoChart"
                    width={width}
                    height={height}
                    data={geoData(data)}
                    options={options}
                />
            </div>
        </div>
    );
}

export default GeoChart;
