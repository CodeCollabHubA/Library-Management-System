import moment from "moment";
import { statusActionArray } from "../../utils/utils";
import {
    categorizeAge, insertMissingHours, countUniqueStrings,
    insertMissingMonths, sortbyDate, topCountSort,
    countUniqueStringsById
} from "../utils/utils"


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

// Females vs. Males: Borrowings Over the Last 6 Months
const femaleVsMaleLast6Month = (arr = [], n = 6) => {
    let temp = { Female: [], Male: [] }
    arr?.forEach(item =>
        temp[item.userNavigation.userSex]?.push(`${item.createdAt.slice(0, 7)}-01`)
    ) || []
    let males = insertMissingMonths(sortbyDate(countUniqueStrings(temp.Female)))?.slice(0, n)
    let females = insertMissingMonths(sortbyDate(countUniqueStrings(temp.Male)))?.slice(0, n)
    return { males, females }
}

// Females vs. Males: Top 5 Borrowed Book Categories
const topCategoryByMalevsFemale = (arr = [], n) => {

    const temp = { Female: [], Male: [] }
    arr.forEach(item => {
        temp[item.userNavigation.userSex]?.push(item.bookNavigation.bookGenre)
    })

    let males = topCountSort(countUniqueStrings(temp.Female))?.slice(0, n)
    let females = topCountSort(countUniqueStrings(temp.Male))?.slice(0, n)

    return { males, females }
}

// Top Borrowed Book Categories
const topBorrowingCategory = (arr, n, showOthers = true) => {
    return countUniqueStrings(arr?.map(item => item.bookNavigation.bookGenre) || [], n, showOthers)
        || []
}

// 24 borrowings requests hours insights
const borrowingHours = (arr) => {
    const countUniqueHours = countUniqueStrings(arr?.map(item => item.createdAt.split("T")[1].slice(0, 2)) || [])
    const Hours = countUniqueHours?.sort((a, b) => a.name.localeCompare(b.name)) || []
    return insertMissingHours(Hours)
}

// get the top 'n' borrowed authors
const topBorrowedAuthors = (arr = [], n) => {
    return topCountSort(countUniqueStrings(arr.map(item => item.bookNavigation.author.name)), n)
}

// get the top 'n' borrowed books
const topBorrowedBooks = (arr = [], n) => {
    let newArr = topCountSort(countUniqueStrings(arr.map(item => item.bookNavigation.title)), n)
    newArr.forEach(item => {
        item.name = item.name.split(" ").slice(0, 2).join(" ")
    })
    return newArr
}

// get the count of users per address, converted to abbreviations
const topUserAddresses = (arr) => {
    let newArr = arr?.map(item => {
        switch (item.userNavigation.address) {
            case "Abu Dhabi":
                return "AE-AZ";
            case "Fujairah":
                return "AE-AJ";
            case "Sharjah":
                return "AE-FU";
            case "Ras Al Khaimah":
                return "AE-SH";
            case "Dubai":
                return "AE-DU";
            case "Umm al-Quwain":
                return "AE-RK";
            case "Ajman":
                return "AE-UQ";
        }
    })
    let temp = {}
    countUniqueStrings(newArr).map(item => temp[item.name] = item.count)
    return temp || {}

}

/**
 * Retrieves the top `n` users based on borrowing activity and calculates the total count of borrowings.
 * Also determines the percentage increase or decrease in borrowing activity between two specified dates.
 * 
 * @param {Object} params - The parameters for the function.
 * @param {Array} params.arr - The array of borrowing data.
 * @param {Date} params.prev - The start date for the comparison period.
 * @param {Date} params.next - The end date for the comparison period.
 * @param {number} params.n - The number of top users to retrieve.
 * @returns {Array} The top `n` users with their borrowing activity and percentage change.
 */
const topUsers = ({ arr, prev, next, n }) => {
    let newArr = []
    arr?.forEach((item, i) => {
        const itemDate = new Date(item.createdAt)
        if (next < itemDate) {
            newArr.push(item.userNavigation)
        }
    }) || []
    const topActiveUsers = countUniqueStringsById(newArr, n)
    const topActiveUsersIdArray = topActiveUsers.map(item => item.id) || []
    let usersDataBetweenDates = topUsersBetweenDates({ arr, idArray: topActiveUsersIdArray, prev, next })

    topActiveUsers?.forEach(item => {
        // Calculate the percentage change in borrowing activity for each top active user.
        // If there is no previous value, assume it as 1 to prevent division by zero errors
        const prev = usersDataBetweenDates[item.id] || 1
        const curr = item.count
        const percentage = ((curr - prev) / prev) * 100;
        item.percentage = percentage
    }) || []

    return topActiveUsers
}

/**
 * Counts the number of borrowing activities for each user in the given ID array within the specified date range.
 * 
 * @param {Object} params - The parameters for the function.
 * @param {Array} params.arr - The array of borrowing data.
 * @param {Array} params.idArray - The array of user IDs to filter by.
 * @param {Date} params.prev - The start date of the date range.
 * @param {Date} params.next - The end date of the date range.
 * @returns {Object} An object where keys are user IDs and values are the count of borrowings within the date range.
 */
const topUsersBetweenDates = ({ arr, idArray, prev, next }) => {
    let newArr = []

    arr?.forEach((item, i) => {
        if (moment(item.createdAt).isBetween(prev, next)) {
            if (idArray?.includes(item.userNavigation.id)) {
                newArr.push(item.userNavigation.id)
            }
        }
    })
    let temp = {}
    countUniqueStrings(newArr)?.forEach(item => temp[item.name] = item.count) || []
    return temp
}

/**
 * Generates a summary of borrowing requests from an array of borrowings.
 * 
 * @param {Array} arr - Array of borrowing request objects.
 * @returns {Array} An array of summarized borrowing request objects, up to a maximum of 26 items.
 */
const recentBorrowingActivities = (arr) => {
    const createBorrowingSummary = (item) => {
        let temp = {
            id: item.id,
            userRole: item.userNavigation.userRole,
            user: item.userNavigation.name,
            book: item.bookNavigation.title,
            status: item.status
        }
        if (["Rejected", "Approved", "Returned"].includes(item.status)) {
            temp.userRole = "Admin"
            temp.admin = item[`${item.status}By`] || "undefined"
        }
        if (item.userNavigation.userRole === "Admin") {
            temp.admin = item[`${item.status}By`] || "undefined"
            if (item.status === "Borrowed") {
                temp.admin = item.userNavigation.name
            }
        }

        return temp
    }

    return arr?.slice(0, 26).map(createBorrowingSummary)
}

/**
 * Counts the unique rejection reasons in an array of objects and returns the top 'n' reasons.
 * 
 * @param {Array} arr - Array of objects containing borrowings.
 * @param {number} n - Number of top rejection reasons to return.
 * @returns {Array} An array containing the top 'n' unique rejection reasons along with their counts.
 */
const countRejectionReasons = (arr, n) => {
    let newArr = []
    arr?.forEach(item => { if (item.rejecotionReason) newArr.push(item.rejecotionReason) })
    return countUniqueStrings(newArr, n, true)
}

/**
 * Retrieves borrowing requests to be processed, including pending and borrowed requests.
 * 
 * @param {Array} arr - Array of borrowing request objects.
 * @param {number} n - Number of borrowing requests to return.
 * @returns {Array} An array containing borrowing requests to be processed.
 */
const getBorrowingsToProcess = (arr, n) => {
    let newArr = []
    arr?.slice(0, 100).forEach(item => { if (statusActionArray.includes(item.status)) newArr.push(item) })
    return newArr.slice(0, n)
}

/**
* Generates insights about library statistics such as books, users, and borrowings.
* Calculates current and previous month statistics along with percentage changes.
* 
* @param {Object} data - Object containing data arrays for books, users, and borrowings.
* @returns {Object} Insights object containing statistics for books, users, and borrowings.
*/
const generateLibraryInsights = ({ data, prev, next }) => {

    const LibraryLastMonthInsights = (arr, dateAfter) => {
        const lengthArr = []
        arr?.forEach(item => {
            const createdAt = moment(item.createdAt)
            if (createdAt > dateAfter) return lengthArr.push(0)
        })
        return lengthArr.length
    }

    const LibraryBetweenDatesInsights = ({ arr, prev, next }) => {
        const lengthArr = []
        arr?.forEach(item => {
            const createdAt = moment(item.createdAt)
            if (createdAt.isBetween(prev, next)) return lengthArr.push(0)
        })
        // If there is no previous value, assume it as 1 to prevent division by zero errors
        return lengthArr.length || 1
    }

    const booksCurr = LibraryLastMonthInsights(data?.books, next)
    const usersCurr = LibraryLastMonthInsights(data?.User, next)
    const borrowingsCurr = LibraryLastMonthInsights(data?.Borrowing, next)

    const booksPrev = LibraryBetweenDatesInsights({ arr: data?.books, prev, next })
    const usersPrev = LibraryBetweenDatesInsights({ arr: data?.User, prev, next })
    const borrowingsPrev = LibraryBetweenDatesInsights({ arr: data?.Borrowing, prev, next })

    const users = {
        count: usersCurr,
        percentage: (usersCurr - usersPrev) / usersPrev * 100,
    }
    const books = {
        count: booksCurr,
        percentage: (booksCurr - booksPrev) / booksPrev * 100,
    }
    const borrowings = {
        count: borrowingsCurr,
        percentage: (borrowingsCurr - borrowingsPrev) / borrowingsPrev * 100,
    }

    return { User: users, Book: books, Borrowing: borrowings }
}


const useDataNormalizer = (data) => {

    const totalBooks = data?.Book?.length || 0
    const totalAuthors = data?.Author?.length || 0
    const totalUsers = data?.User?.length || 0
    const ageCategories = usersAgeCategories(data?.User)
    const registerdUserslast12Month = registerdUserslastMonths(data?.User, 12)


    const totalBorrowings = data?.Borrowing?.length || 0
    const femalevsMaleBorrowing = femaleVsMaleLast6Month(data?.Borrowing, 6)
    const top5CategoryMalesvsFemales = topCategoryByMalevsFemale(data?.Borrowing, 5)
    const topBorrowingBookCategory = topBorrowingCategory(data?.Borrowing, 6, true)
    const borrowingHoursInsights = borrowingHours(data?.Borrowing)
    const topAuthors = topBorrowedAuthors(data?.Borrowing, 5)
    const trendingBooks = topBorrowedBooks(data?.Borrowing, 3)
    const topAddresses = topUserAddresses(data?.Borrowing)
    const recentActivities = recentBorrowingActivities(data?.Borrowing, 8)
    const rejecotionReasons = countRejectionReasons(data?.Borrowing, 6)
    const borrowingsToProcess = getBorrowingsToProcess(data?.Borrowing, 12)
    const topActiveUsers = topUsers({
        arr: data?.Borrowing,
        // arbitrary number user for better appearnce of he number
        prev: moment().subtract(8, "week"),
        next: moment().subtract(5, "week"),
        n: 6
    })
    const getLibraryInsights = generateLibraryInsights({
        data,
        // arbitrary number user for better appearnce of he number
        prev: moment().subtract(7, "week"),
        next: moment().subtract(4, "week")
    })





    return {
        totalBooks,
        totalAuthors,
        totalUsers,
        ageCategories,
        registerdUserslast12Month,
        totalBorrowings,
        femalevsMaleBorrowing,
        top5CategoryMalesvsFemales,
        topBorrowingBookCategory,
        borrowingHoursInsights,
        topAuthors,
        trendingBooks,
        topAddresses,
        topActiveUsers,
        recentActivities,
        rejecotionReasons,
        borrowingsToProcess,
        getLibraryInsights,
    }
}

export default useDataNormalizer;
