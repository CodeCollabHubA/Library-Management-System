import { faker } from '@faker-js/faker';
import fs from 'fs'

const date = { from: '2023-06-01T00:00:00.000Z', to: '2024-05-15T00:00:00.000Z' }

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

const category = [
    "Fiction",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "History",
    "Biography",
    "Self-Help",
    "Horror",
    "Poetry",
    // "Classics",
    // "Adventure",
    // "Mystery",
    // "Thriller",
    // "Children's Books",
    // "Health & Wellness",
    // "Business & Economics",
];

const uae = [
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
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();

    return {
        id: faker.string.uuid(),
        name: firstName + " " + lastName,
        email: faker.internet.email({ firstName, lastName }),
        sex,
        address: faker.helpers.arrayElement(uae),
        birthday: faker.date.birthdate(),
        credit: Number(faker.string.numeric(1)) * 10,
        phone: faker.phone.imei(),
        image: `${faker.helpers.arrayElement(Array.from({ length: 9 }, (_, i) => i))}.jpg`,
        userRole: faker.helpers.arrayElement(['Admin', 'User']),
        createdAt: faker.date.between(date),
    }
}

const publisher = () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    address: faker.helpers.arrayElement(uae),

})

const author = () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
})

const book = ({ author, publisher }) => ({
    id: faker.string.uuid(),
    category: faker.helpers.arrayElement(category),
    title: faker.word.words({ count: { min: 6, max: 10 } }),
    description: faker.word.words({ count: { min: 30, max: 100 } }),
    credit: Number(faker.string.numeric(2)),
    numberOfTotalCopies: Number(faker.string.numeric(2)),
    numberOfAvailableCopies: Number(faker.string.numeric(2)),
    createdAt: faker.date.between(date),
    author,
    publisher,
})

const borrowing = ({ book, user }) => ({
    id: faker.string.uuid(),
    status: faker.helpers.arrayElement(BorrowingsStatusArray),
    numberOfTotalCopies: Number(faker.string.numeric(2)),
    numberOfAvailableCopies: Number(faker.string.numeric(2)),
    dateOut: faker.date.between(date),
    dueDate: faker.date.between(date),
    createdAt: faker.date.between(date),
    bookNavigation: book,
    userNavigation: user,
    rejecotionReason: faker.helpers.arrayElement(rejecotionReasons),
    RejectedBy: faker.person.fullName(),
    ApprovedBy: faker.person.fullName(),
    ReturnedBy: faker.person.fullName(),
})

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
        const author = data.authors[Math.floor(Math.random() * data.authors.length)]
        const publisher = data.publishers[Math.floor(Math.random() * data.publishers.length)]
        arr.push(book({ author, publisher }));
    }
    return arr;
};

const generateBorrowing = ({ length, borrowing, data }) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
        const book = data.books[Math.floor(Math.random() * data.books.length)]
        const user = data.users[Math.floor(Math.random() * data.users.length)]
        arr.push(borrowing({ user, book }));
    }
    return arr;
};

function populate(x1, x2, x3, x4, x5) {

    const data = {
        users: generateData(x1, user),
        publishers: generateData(x2, publisher),
        authors: generateData(x3, author),
    }
    data.books = generateBook({ length: x4, book, data })
    data.borrowings = generateBorrowing({ length: x5, borrowing, data })

    return data

}


const dataJson = JSON.stringify(populate(130, 120, 300, 5000, 8500), null, 2);

// Write JSON string to a file
fs.writeFile('../../public/data.json', dataJson, (err) => {
    if (err) {
        console.error('Error writing file', err);
    } else {
        console.log('Successfully wrote file');
    }
});
