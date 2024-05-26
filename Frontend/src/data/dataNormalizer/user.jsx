import moment from 'moment'
import { categorizeAge, countUniqueStrings, insertMissingMonths, sortbyDate } from "../utils/utils"

// categorize users by age
const usersAgeCategories = (arr) => {
    const ages = countUniqueStrings(arr?.map(item => moment().diff(item.birthday, "years")) || [])
    return categorizeAge(ages)
}

// get the count of users registered in the last 'n' months
const registerdUserslastMonths = (arr, n) => {
    const registerdUsersPerMonth = countUniqueStrings(arr?.map(item => `${item.createdAt.slice(0, 7)}-01`) || []) || []
    return insertMissingMonths(sortbyDate(registerdUsersPerMonth))?.slice(0, n)
}


const useDataNormalizer = (data) => {

    const totalUsers = data?.users?.length || 0
    const ageCategories = usersAgeCategories(data?.users)
    const registerdUserslast12Month = registerdUserslastMonths(data?.users, 12)

    return { totalUsers, ageCategories, registerdUserslast12Month }
}

export default useDataNormalizer;
