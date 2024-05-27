import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker';
import fs from 'fs'
import moment from 'moment';

const profileImage = (sex) => {
    return `${sex}${faker.helpers.arrayElement(Array.from({ length: 9 }, (_, i) => i))}.jpg`
}

const bookCoverImage = (ISBN) => {
    // from https://openlibrary.org/dev/docs/api/covers
    // `https://covers.openlibrary.org/b/$key/$value-$size.jpg`
    return `https://covers.openlibrary.org/b/isbn/ISBN-L.jpg`
}

const date = (startDate = new Date(moment().subtract(1, "year"))) => {
    const createdAt = faker.date.between({ from: startDate, to: new Date() }).toISOString();
    const updatedAt = faker.date.between({ from: createdAt, to: new Date() }).toISOString()
    return { createdAt, updatedAt }
}

const timeStamp = (updatedAt) => {
    return `${faker.string.alpha(8)}#${updatedAt}`
}

const byAdmin = ({ status, admin }) => {
    const byAdmin = {}

    adminProcessedStatus.forEach(item => byAdmin[`${item.toLowerCase()}ByNavigation`] = null)

    if (adminProcessedStatus.includes(status)) {
        byAdmin[`${status.toLowerCase()}ByNavigation`] = admin
    }
    return byAdmin
}

const rejecotionReason = (status) => {
    return status === "Rejected"
        ?
        faker.helpers.arrayElement(rejecotionReasons)
        :
        null
}

const bookBorrowingDuration = 2

const userRoleArray = ["Admin", "User"]

const adminProcessedStatus = ["Rejected", "Approved", "Returned"]


const BorrowingActionstring = [
    "Request",
    "Confirm",
    "Cancel",
    "Approve",
    "Reject",
    "Return"
]

const rejecotionReasons = [
    'Outstanding Fines or Fees',
    'Outdated Membership Card',
    'All Copies Currently Borrowed',
    'Exceeded Borrowing Limit',
    'Overdue Books Not Returned',
    'Account Suspended or Inactive',
    'Insufficient Account Privileges',
    'Duplicate Borrowing Request',
    'Incomplete User Information',
    'Restricted Borrowing Access',
    // 'Other'
];

const BorrowingsStatusArray = [
    "Pending",
    "Canceled",
    "Rejected",
    "Approved",
    "Confirmed",
    "Borrowed",
    "Returned",
]


const genreArray = [
    "Romance",
    "Anime",
    "Fiction",
    "Fantasy",
    "Thriller",
    "SelfHelp",
    "Horror",
    "History",
    "Medicine",
    "Biography",
    "Business",
    // "None",
    // "Other",
    // "Children", "Comedy", "Comics", "Cooking", "Drama", "Cartoon",
    // "Film", "Game", "Health", "Historical", Music","Education","Law",
    // "Science", "ScienceFiction", "Technology", "Travel","Art","Arts",
    // "Mystery", "Politics", "Poetry", "Psychology", "Religion","Animation"
];

const UAEProvineArray = [
    'Abu Dhabi',
    'Fujairah',
    'Sharjah',
    'Ras Al Khaimah',
    'Dubai',
    'Umm al-Quwain',
    'Ajman'
];


const user = () => {
    const sex = faker.person.sexType();
    const userSex = sex[0].toUpperCase() + sex.slice(1)
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();
    const rawPassword = faker.internet.password()
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(rawPassword, salt);

    return {
        id: faker.string.uuid(),
        name: firstName + " " + lastName,
        email: faker.internet.email({ firstName, lastName }),
        userSex,
        password: hashedPassword,
        address: faker.helpers.arrayElement(UAEProvineArray),
        birthday: faker.date.birthdate(),
        imageURL: profileImage(sex),
        phone: faker.phone.imei(),
        credit: Number(faker.string.numeric(1)) * 10,
        bio: faker.word.words({ count: { min: 5, max: 30 } }),
        userRole: faker.helpers.arrayElement(userRoleArray),
        timeStamp: timeStamp(date().updatedAt),
        createdAt: date().createdAt,
    }
}

const publisher = () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    address: faker.helpers.arrayElement(UAEProvineArray),
    timeStamp: timeStamp(date().updatedAt),
    createdAt: date().createdAt,
})

const author = () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    timeStamp: timeStamp(date().updatedAt),
    createdAt: date().createdAt,
})

const book = ({ author, publisher }) => {
    const ISBN = "0385472579"

    return {
        id: faker.string.uuid(),
        bookGenre: faker.helpers.arrayElement(genreArray),
        title: faker.word.words({ count: { min: 3, max: 8 } }),
        description: faker.word.words({ count: { min: 20, max: 100 } }),
        credit: Number(faker.string.numeric(2)),
        numberOfTotalCopies: Number(faker.string.numeric(2)),
        numberOfAvailableCopies: Number(faker.string.numeric(2)),
        author,
        publisher,
        ISBN,
        imageURL: bookCoverImage(ISBN),
        timeStamp: timeStamp(date().updatedAt),
        createdAt: date().createdAt,
    }
}


const borrowing = ({ book, user, admin }) => {
    const status = faker.helpers.arrayElement(BorrowingsStatusArray)

    return {
        status,
        id: faker.string.uuid(),
        dateOut: date().updatedAt,
        dueDate: new Date(moment(date().updatedAt).add(bookBorrowingDuration, "week")),
        rejecotionReason: rejecotionReason(status),
        bookNavigation: book,
        userNavigation: user,
        ...byAdmin({ status, admin }),
        timeStamp: timeStamp(date().updatedAt),
        createdAt: date().createdAt,
    }
}

const generateData = (length, object) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(object());
    }
    return arr;
};

const generateBook = ({ length, book, data }) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
        const author = data.Author[Math.floor(Math.random() * data.Author.length)]
        const publisher = data.Publisher[Math.floor(Math.random() * data.Publisher.length)]
        arr.push(book({ author, publisher }));
    }
    return arr;
};

const generateBorrowing = ({ length, borrowing, data }) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
        const book = data.Book[Math.floor(Math.random() * data.Book.length)]
        const user = data.User[Math.floor(Math.random() * data.User.length)]
        const admin = data.User[Math.floor(Math.random() * data.User.length)]
        arr.push(borrowing({ user, book, admin }));
    }
    return arr;
};

function populate({ users, publishers, authors, books, borrowings }) {

    const data = {
        User: generateData(users, user),
        Publisher: generateData(publishers, publisher),
        Author: generateData(authors, author),
    }
    data.Book = generateBook({ length: books, book, data })
    data.Borrowing = generateBorrowing({ length: borrowings, borrowing, data })

    return data

}

const data = populate({ users: 150, publishers: 100, authors: 300, books: 5230, borrowings: 9800 })
// const data = populate({ users: 1, publishers: 1, authors: 1, books: 1, borrowings: 1 })

const dataJson = JSON.stringify(data, null, 2);

// Write JSON string to a file
fs.writeFile('../../public/data.json', dataJson, (err) => {
    if (err) {
        console.error('Error writing file', err);
    } else {
        console.log('Successfully wrote file');
    }
});
