import { faAddressCard, faBook, faBookmark, faGauge, faInbox, faPenNib, faRightFromBracket, faSwatchbook, faUserGroup } from "@fortawesome/free-solid-svg-icons";


export const dashboardItem = [
    {
        id: 1,
        to: '/dashboard',
        icon: faGauge,
        name: 'Dashboard',
        role: ['Admin', 'User']
    },
    {
        id: 2,
        to: '/dashboard/inbox',
        icon: faInbox,
        name: 'Inbox',
        role: ['Admin']
    },
    {
        id: 3,
        to: '/dashboard/users',
        icon: faUserGroup,
        name: 'Users',
        role: ['Admin']
    },
    {
        id: 4,
        to: '/dashboard/booksGallery',
        icon: faBook,
        name: 'Book Gallery',
        role: ['Admin', 'User']
    },
    {
        id: 5,
        to: '/dashboard/books',
        icon: faSwatchbook,
        name: 'Book List',
        role: ['Admin']
    },
    {
        id: 5.1,
        to: '/dashboard/borrowings',
        icon: faSwatchbook,
        name: 'Borrowing',
        role: ['Admin']
    },
    {
        id: 5.2,
        to: '/dashboard/borrowings/actions',
        icon: faSwatchbook,
        name: 'Borrowing Actions',
        role: ['Admin']
    },
    {
        id: 5.3,
        to: '/dashboard/borrowings/actions',
        icon: faSwatchbook,
        name: 'Borrowing Actions',
        role: ['User']
    },
    {
        id: 6,
        to: '/dashboard/authors',
        icon: faPenNib,
        name: 'Authors',
        role: ['Admin']
    },
    {
        id: 7,
        to: '/dashboard/publishers',
        icon: faBookmark,
        name: 'Publishers',
        role: ['Admin']
    },
    {
        id: 8,
        to: '/dashboard/profile',
        icon: faAddressCard,
        name: 'Profile',
        role: ['Admin', 'User']
    },
    {
        id: 9,
        to: '/logout',
        icon: faRightFromBracket,
        name: 'Logout',
        role: ['Admin', 'User']
    },
];