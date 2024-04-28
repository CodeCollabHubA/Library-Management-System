import WelcomeBanner from '../layout/dashborad/WelcomeBanner';
// import Banner from '../partials/Banner';
// import DashboardAvatars from '../layout/dashborad/statistics/DashboardAvatars';
// import FilterButton from '../components/dropdown/DropdownFilter';
// import Datepicker from '../components/Datepicker';

import DashboardCard01 from '../layout/dashborad/statistics/DashboardCard01';
import DashboardCard02 from '../layout/dashborad/statistics/DashboardCard02';
import DashboardCard03 from '../layout/dashborad/statistics/DashboardCard03';
import DashboardCard04 from '../layout/dashborad/statistics/DashboardCard04';
import DashboardCard05 from '../layout/dashborad/statistics/DashboardCard05';
import DashboardCard06 from '../layout/dashborad/statistics/DashboardCard06';
import DashboardCard07 from '../layout/dashborad/statistics/DashboardCard07';
import DashboardCard08 from '../layout/dashborad/statistics/DashboardCard08';
import DashboardCard09 from '../layout/dashborad/statistics/DashboardCard09';
import DashboardCard10 from '../layout/dashborad/statistics/DashboardCard10';
import DashboardCard11 from '../layout/dashborad/statistics/DashboardCard11';
import DashboardCard12 from '../layout/dashborad/statistics/DashboardCard12';
import DashboardCard13 from '../layout/dashborad/statistics/DashboardCard13';

function Dashboard() {


  return (
    <main>
      <div className="px-4 mt-10 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Welcome banner */}
        <WelcomeBanner />

        {/* Dashboard actions */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">

          {/* Right: Actions */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Filter button */}

            {/* Datepicker built with flatpickr */}

            {/* Add view button */}
          </div>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-12 gap-6">

          {/* Line chart (Acme Plus) */}
          <DashboardCard01 />
          {/* Line chart (Acme Advanced) */}
          <DashboardCard02 />
          {/* Line chart (Acme Professional) */}
          <DashboardCard03 />
          {/* Bar chart (Direct vs Indirect) */}
          <DashboardCard04 />
          {/* Line chart (Real Time Value) */}
          <DashboardCard05 />
          {/* Doughnut chart (Top Countries) */}
          <DashboardCard06 />
          {/* Table (Top Channels) */}
          <DashboardCard07 />
          {/* Line chart (Sales Over Time) */}
          <DashboardCard08 />
          {/* Stacked bar chart (Sales VS Refunds) */}
          <DashboardCard09 />
          {/* Card (Customers) */}
          <DashboardCard10 />
          {/* Card (Reasons for Refunds) */}
          <DashboardCard11 />
          {/* Card (Recent Activity) */}
          <DashboardCard12 />
          {/* Card (Income/Expenses) */}
          <DashboardCard13 />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;