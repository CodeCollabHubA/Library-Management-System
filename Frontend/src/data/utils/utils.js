import moment from "moment"

// count unique strings in an array and optionally include a count for "Others"
export function countUniqueStrings(arr, n = 0, showOthers = false) {
    const counts = {};
    if (arr) {
        if (!n) n = arr.length || 0
        arr.forEach(str => {
            counts[str] = (counts[str] || 0) + 1;
        });
        const resultArr = [];
        for (const [key, value] of Object.entries(counts)) {
            resultArr.push({ name: key, count: value });
        }
        let sorted
        if (showOthers) {
            sorted = topCountSort(resultArr.slice(0, n))
            sorted = [
                ...sorted,
                { name: "Others", count: resultArr.slice(n).reduce((acc, curr) => acc + curr.count, 0) }
            ]
        }
        else sorted = topCountSort(resultArr.slice(0, n))

        return sorted || []

    }
    return [];
}

// count unique strings in an array and optionally include a count for "Others"
export function countUniqueStringsById(arr, n = 0, showOthers = false) {
    const counts = {};
    if (arr) {
        if (!n) n = arr.length || 0
        arr.forEach((item) => {
            counts[item.id] = {
                item,
                count: (counts[item.id]?.count || 0) + 1
            }
        });
        const resultArr = [];
        for (const [key, value] of Object.entries(counts)) {
            resultArr.push({ ...value.item, count: value.count });
        }
        let sorted = []
        if (showOthers) sorted = topCountSort([
            ...resultArr.slice(0, n),
            { name: "Others", count: resultArr.slice(n).reduce((acc, curr) => acc + curr.count, 0) }
        ])
        else sorted = topCountSortById(resultArr.slice(0, n))
        return sorted
    }
    return [];
}

// sort an array of objects by count in descending order, and alphabetically by name if counts are equal
export function topCountSort(arr, n = 0) {
    if (arr) {
        if (!n) n = arr.length || 0
        if (n > arr?.lenght || !n) n = arr?.lenght
        arr.sort((a, b) => {
            if (b.count < a.count) return -1
            if (b.count > a.count) return 1
            if (b.count === a.count) {
                return a.name.localeCompare(b.name)
            }
        }
        );
        return arr.slice(0, n);
    }
    return []
}

// sort an array of objects by count in descending order, and alphabetically by name if counts are equal
export function topCountSortById(arr, n = 0) {
    if (arr) {
        if (!n) n = arr.length || 0
        if (n > arr?.lenght || !n) n = arr?.lenght
        arr.sort((a, b) => {
            if (b.count < a.count) return -1
            if (b.count > a.count) return 1
            if (b.count === a.count) {
                return a.id.localeCompare(b.id)
            }
        }
        );
        return arr.slice(0, n);
    }
    return []
}

// convert a string date to a Date object
export function toDate(date) {
    return new Date(date)
}

// sort an array of objects by date
export function sortbyDate(arr, field = "name") {
    let newArr = [...arr]
    newArr.sort((a, b) => {
        if (toDate(a[field]) > toDate(b[field])) return -1
        if (toDate(a[field]) < toDate(b[field])) return 1

    })
    return newArr || [];
}

// categorize ages into predefined age groups
export const categorizeAge = (arr = []) => {
    const agesCategories = {
        '0-18': 0,
        '19-24': 0,
        '25-34': 0,
        '35-44': 0,
        '45-55': 0,
        '56+': 0,
    };

    arr.forEach(item => {
        let age = item.name
        if (18 > age) agesCategories['0-18'] += item.count
        if (18 < age && age < 24) agesCategories['19-24'] += item.count
        if (24 < age && age < 34) agesCategories['25-34'] += item.count
        if (34 < age && age < 44) agesCategories['35-44'] += item.count
        if (44 < age && age < 55) agesCategories['45-55'] += item.count
        if (55 < age) agesCategories['56+'] += item.count
    })
    let ageArr = []
    for (let [key, value] of Object.entries(agesCategories)) {
        ageArr.push({ name: key, count: value })
    }
    return ageArr || []
}

// insert missing months into an array of objects, ensuring all months are present
export const insertMissingMonths = (originalArr, field = "name") => {
    let arr = [...originalArr]
    for (let i = 0; i < arr.length; i++) {
        const expectedMonth = `${moment().subtract(i, 'months').format('YYYY-MM')}-01`
        const receivedDate = arr[i]?.[field]
        if (receivedDate !== expectedMonth) {
            const newEle = {
                [field]: `${moment().subtract(i, 'months').format('YYYY-MM')}-01`,
                count: 0
            }
            arr.splice(i, 0, newEle)
        }
    }
    return arr || []
}

// insert missing hours into an array of objects, ensuring all hours are present
export const insertMissingHours = (arrHours) => {
    const existingEntries = new Set(arrHours.map(item => item.name.split(":")[0]));
    const newArr = [];
    for (let hour = 0; hour < 24; hour++) {
        const timeString = `${hour.toString().padStart(2, '0')}`;
        if (existingEntries.has(timeString)) {
            newArr.push(arrHours.find(item => item.name === timeString));
        } else {
            newArr.push({ name: timeString, count: 0 });
        }
    }
    return newArr || [];
}

// insert missing hours and minutes into an array of objects, ensuring all time slots are present
export const insertMissingHoursMinutes = (arr) => {
    const existingEntries = new Set(arr.map(item => item.name));
    const newArr = [];

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute++) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            if (existingEntries.has(timeString)) {
                newArr.push(arr.find(item => item.name === timeString));
            } else {
                newArr.push({ name: timeString, count: 0 });
            }
        }
    }

    return newArr || [];
}