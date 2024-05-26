import { Chart } from 'react-google-charts';
import { tailwindConfig } from '../../../utils/utils';


const geoData = () => ([
    ['Country', 'Users'],
    [{ v: "AE", f: "United Arab Emirates" }, Math.round(Math.random() * 100)],
    [{ v: "BH", f: "Bahrain" }, Math.round(Math.random() * 100)],
    [{ v: "CY", f: "Cyprus" }, Math.round(Math.random() * 100)],
    [{ v: "IQ", f: "Iraq" }, Math.round(Math.random() * 100)],
    [{ v: "JO", f: "Jordan" }, Math.round(Math.random() * 100)],
    [{ v: "KW", f: "Kuwait" }, Math.round(Math.random() * 100)],
    [{ v: "LB", f: "Lebanon" }, Math.round(Math.random() * 100)],
    [{ v: "OM", f: "Oman" }, Math.round(Math.random() * 100)],
    [{ v: "PS", f: "Palestine" }, Math.round(Math.random() * 100)],
    [{ v: "QA", f: "Qatar" }, Math.round(Math.random() * 100)],
    [{ v: "SA", f: "Saudi Arabia" }, Math.round(Math.random() * 100)],
    [{ v: "SY", f: "Syria" }, Math.round(Math.random() * 100)],
    [{ v: "TR", f: "Turkey" }, Math.round(Math.random() * 100)],
    [{ v: "YE", f: "Yemen" }, Math.round(Math.random() * 100)],
])

const options = {
    region: '145',
    displayMode: 'regions',
    colorAxis: { colors: [tailwindConfig().theme.colors.slate[300], tailwindConfig().theme.colors.indigo[900]] },
    datalessRegionColor: tailwindConfig().theme.colors.slate[50],
    // displayMode: 'markers',
    // sizeAxis: { minSize: 5, maxSize: 15 },
    // magnifyingGlass: { enable: true, zoomFactor: 7.5 },
    // centerLatLng: { lat: 25.276987, lng: 55.296249 },
};


const d = [
    // ['City', 'Population', 'Area'],
    // [{ v: "AE-AZ", f: 'Abu Dhabi' }, 1482816, 972],
    // [{ v: "AE-DU", f: 'Dubai' }, 3331420, 4114],
    // [{ v: "QA-DA", f: 'Doha' }, 956460, 132],
    // [{ v: "SA-01", f: 'Riyadh' }, 6883000, 1975],
    // [{ v: "OM-MA", f: 'Muscat' }, 1631400, 3500],
    // [{ v: "KW-KU", f: 'Kuwait City' }, 61077, 200],
    // [{ v: "BH-15", f: 'Manama' }, 157474, 30],
    // [{ v: "AE-SH", f: 'Sharjah' }, 1400000, 235],
    // [{ v: "SA-02", f: 'Jeddah' }, 3976000, 1765],
    // [{ v: "SA-04", f: 'Dammam' }, 1063000, 800],
    // [{ v: "OM-SH", f: 'Salalah' }, 340815, 54],
    // [{ v: "AE-AJ", f: 'Ajman' }, 504846, 259],
    // [{ v: "SA-04", f: 'Al Khobar' }, 165799, 571],
    // [{ v: "AE-FU", f: 'Fujairah' }, 152000, 1165],
    // [{ v: "AE-AZ", f: 'Al Ain' }, 766936, 13400],
    // [{ v: "SA-04", f: 'Khobar' }, 165799, 571],
    // [{ v: "BH", f: 'Bahrain' }, 1543300, 765],
    // [{ v: "KW-KU", f: 'Sharq' }, 61077, 200],
    // [{ v: "AE-FU", f: 'Dibba Al-Hisn' }, 30160, 35],
    // [{ v: "SA-04", f: 'Al Jubail' }, 224430, 1020],
    // [{ v: "OM-SH", f: 'Sohar' }, 140006, 1700],
    // [{ v: "KW-HA", f: 'Hawally' }, 164212, 21],
    // [{ v: "KW-JA", f: 'Al Jahra' }, 491700, 11900],
    // [{ v: "AE-RK", f: 'Ras Al Khaimah' }, 345000, 1684],
    // [{ v: "SA-04", f: 'Hofuf' }, 1507000, 158],
    // [{ v: "OM-DA", f: 'Nizwa' }, 72076, 14],
    // [{ v: "BH-15", f: 'Muharraq' }, 157474, 30],
    // [{ v: "AE-UQ", f: 'Umm Al Quwain' }, 80494, 777],
    // [{ v: "OM-SH", f: 'Sur' }, 120000, 6800],
    // [{ v: "KW-FA", f: 'Al Farwaniyah' }, 973561, 190]
];

function GeoChart({ className, data, width, height }) {

    return (
        <div className={`flex flex-col bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 ${className}`}>
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="capitalize font-semibold text-slate-800 dark:text-slate-100">Top region countries by active users</h2>
            </header>
            <Chart
                chartType="GeoChart"
                width={width}
                height={height}
                data={geoData()}
                options={options}
            />
        </div>
    );
}

export default GeoChart;
