import { useMyContext } from '../context/ContextProvider';
import useBorrowingNormalizer from '../data/dataNormalizer/borrowing';
import useUserNormalizer from '../data/dataNormalizer/user';

import Icon1 from '../assets/icons/icon-01.svg';
import Icon2 from '../assets/icons/icon-02.svg';
import Icon3 from '../assets/icons/icon-03.svg';

import WelcomeBanner from '../layout/dashborad/WelcomeBanner';
import Total from '../layout/dashborad/statistics/Total';
import CardBar01 from '../layout/dashborad/statistics/CardBar01';
import CardBar02 from '../layout/dashborad/statistics/CardBar02';
import CardBar03 from '../layout/dashborad/statistics/CardBar03';
import CardLine01 from '../layout/dashborad/statistics/CardLine01';
import CardEarnings from "../layout/dashborad/statistics/CardEarnings";
import CardDoughnut01 from '../layout/dashborad/statistics/CardDoughnut01';
import CardUAEProvince from '../layout/dashborad/statistics/CardUAEProvince';
import CardUAECities from '../layout/dashborad/statistics/CardUAECities';
import CardReasons from '../layout/dashborad/statistics/CardReasons';
import CardTopUsers from '../layout/dashborad/statistics/CardTopUsers';
import CardRecentCounts from '../layout/dashborad/statistics/CardRecentCounts';
import CardRecentActivity from '../layout/dashborad/statistics/CardRecentActivity';
import CardActionsToTake from '../layout/dashborad/statistics/CardActionsToTake';


function Dashboard() {
  const { data } = useMyContext()

  const {
    totalBorrowings,
    femalevsMaleBorrowing,
    top5CategoryMalesvsFemales,
    topBorrowingBookCategory,
    borrowingHoursInsights,
    // topAuthors,
    // trendingBooks,
    topAddresses,
    topActiveUsers,
    recentActivities,
    rejecotionReasons,
    borrowingsToProcess,
    getLibraryInsights,
  } = useBorrowingNormalizer(data)

  const { totalUsers, ageCategories, registerdUserslast12Month } = useUserNormalizer(data)

  const totalBooks = data?.books?.length || 0
  const totalAuthors = data?.authors?.length || 0

  return (
    <main>
      <div className="px-4 mt-10 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <WelcomeBanner />

        <div className="grid grid-cols-12 gap-6">

          {/* Display total of x */}
          <Total Icon={Icon1} title1="Enthusiastic Readers Joined" total={totalUsers} />
          <Total Icon={Icon2} title1="Books to Explore" total={totalBooks} />
          <Total Icon={Icon2} title1="Authors Featured" total={totalAuthors} className="xl:hidden" />
          <Total Icon={Icon3} title1="Borrowing Requests Processed" total={totalBorrowings} />

          {/* Display borrowing requests by gender (males vs females) for the last 6 months */}
          <CardBar01 data={femalevsMaleBorrowing} className="min-h-[500px] col-span-full lg:col-span-6" />

          {/* Display top book category borrowing (males vs females) */}
          <CardBar02 data={top5CategoryMalesvsFemales} className="min-h-[500px] col-span-full lg:col-span-6" />

          {/* Display new users registered monthly for the last 12 months */}
          <CardBar03 data={registerdUserslast12Month} className="min-h-[500px] col-span-full lg:col-span-6" />

          {/* Display borrowing request insights by the most active hours (24-Hour Borrowing Request Insights) */}
          <CardLine01 data={borrowingHoursInsights} className="min-h-[500px] col-span-full lg:col-span-6" />

          {/* Display borrowing real time borrowing earning (fake data) */}
          <CardEarnings className="min-h-[300px] col-span-full xxl:col-span-6" />

          {/* Display a doughnut chart for top borrowing book categories */}
          <CardDoughnut01
            data={topBorrowingBookCategory}
            cutout={"80%"}
            label='top borrowed book category'
            title='top borrowed book category'
            className="min-h-[500px] col-span-full  md:col-span-6"
          />

          {/* Display a doughnut chart for users by age */}
          <CardDoughnut01
            data={ageCategories}
            cutout={"0%"}
            label="Users By Age"
            title="registered users by age"
            className="min-h-[500px] col-span-full  md:col-span-6"
          />

          {/* Display a map showing user addresses by UAE province */}
          <CardUAEProvince width={"100%"} height={"100%"} data={topAddresses} className="min-h-[500px] col-span-full xl:col-span-6" />

          {/* Display a map showing user addresses by UAE cities */}
          {/* currently by Western Asia countries cities google need API key */}
          <CardUAECities width={"100%"} height={"100%"} data={topAddresses} className="min-h-[500px] col-span-full xl:col-span-6" />

          {/* Displays the reasons for borrowing rejections */}
          <CardReasons data={rejecotionReasons} className="min-h-[400px] col-span-full xl:col-span-6" />

          {/* Displays the recent borrowing activities */}
          <CardRecentCounts data={getLibraryInsights} className="min-h-[400px] col-span-full xl:col-span-6" />

          {/* Displays the recent activities new users, new books ..etc*/}
          <CardRecentActivity data={recentActivities} className="min-h-[400px] col-span-full xxl:col-span-6" />

          {/* Shows the top users based on borrowing activity */}
          <CardTopUsers data={topActiveUsers} className="min-h-[400px] col-span-full xxl:col-span-6" />

          {/* Lists the actions to take on borrowing requests */}
          <CardActionsToTake data={borrowingsToProcess} className="min-h-[400px] col-span-full xxl:col-span-6" />

        </div>
      </div>
    </main >
  );
}

export default Dashboard;