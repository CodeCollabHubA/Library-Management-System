/** @type {import('tailwindcss').Config} */
import { BorrowingsStatusArray, statusToColor } from './src/utils/utils'

const safelist = [
  ...BorrowingsStatusArray.map(item => `bg-${item}`),
  ...BorrowingsStatusArray.map(item => `text-${item}`),
  ...BorrowingsStatusArray.map(item => `border-${item}`),
  ...BorrowingsStatusArray.map(item => `hover:bg-${item}`),
  ...BorrowingsStatusArray.map(item => `hover:text-${item}`),
  ...BorrowingsStatusArray.map(item => `hover:border-${item}`)
]

const myColors = {
  "Pending": statusToColor.Pending,
  "Canceled": statusToColor.Canceled,
  "Rejected": statusToColor.Rejected,
  "Approved": statusToColor.Approved,
  "Confirmed": statusToColor.Confirmed,
  "Borrowed": statusToColor.Borrowed,
  "Returned": statusToColor.Returned,
}


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  safelist: [
    ...safelist
  ],
  theme: {
    extend: {
      colors: myColors,
      screens: {
        'xs': '250px',
        'xxl': '1500px',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

