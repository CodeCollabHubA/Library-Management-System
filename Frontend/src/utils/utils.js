import resolveConfig from 'tailwindcss/resolveConfig';
import colors from 'tailwindcss/colors'

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/assets/css/tailwind.config.js')
}

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

export const dateFormater = (dateString) => {
  if (!dateString) return null
  if (typeof dateString !== "string") return "not string date"
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [year, month, day] = dateString.split('-');
  const formattedMonth = months[parseInt(month, 10) - 1];
  return `${formattedMonth} ${parseInt(day, 10)}`;
}

export const formatNumber = (n) => {
  let char = ""
  let plus = ""
  if ((1000 <= n) && (n < 1000 * 1000)) {
    char = "K"
    n = (n / (1000))
  }
  else if ((1000 * 1000 <= n) && (n < 1000 * 1000 * 1000)) {
    char = "M"
    n = (n / (1000 * 1000))
  }
  else if ((1000 * 1000 * 1000 <= n) && (n < 1000 * 1000 * 1000 * 1000)) {
    char = "B"
    n = (n / (1000 * 1000 * 1000))
  }
  n = n?.toFixed(1)
  n = n?.split(".")[1] === "0" ? n?.split(".")[0] : n
  if (char) plus = "+"
  return plus + n + char
}

export const BorrowingsStatusArray = [
  "Pending",
  "Canceled",
  "Rejected",
  "Approved",
  "Confirmed",
  "Borrowed",
  "Returned",
]

export let BorrowingsStatusObject = {}
BorrowingsStatusArray.forEach(item => BorrowingsStatusObject[item] = item)

export const statusToColor = {
  "Pending": colors.slate[600],
  "Canceled": colors.red[500],
  "Rejected": colors.red[500],
  "Approved": colors.green[500],
  "Confirmed": colors.blue[500],
  "Borrowed": colors.indigo[500],
  "Returned": colors.teal[500]
}

export const statusToIcon = {
  [BorrowingsStatusObject.Pending]: "faHourglassHalf",
  [BorrowingsStatusObject.Canceled]: "faUndo",
  [BorrowingsStatusObject.Rejected]: "faBan",
  [BorrowingsStatusObject.Approved]: "faCheckCircle",
  [BorrowingsStatusObject.Confirmed]: "faThumbsUp",
  [BorrowingsStatusObject.Borrowed]: "faBookOpen",
  [BorrowingsStatusObject.Returned]: "faUndo",
}

export const resourceToIcon = {
  "Book": "faBook",
  "Borrowing": "faExchange",
  "User": "faUser"
}

export const statusActionArray = ["Pending", "Approved", "Borrowed"]


export const bookBorrowingDuration = 2

export const userSexArray = ["Male", "Female"]

export const userRoleArray = ["Admin", "User"]

export const adminProcessedStatus = ["Rejected", "Approved", "Returned"]


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