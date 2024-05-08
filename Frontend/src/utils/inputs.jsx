import * as yup from 'yup';


// ******************
// resource names
// ******************
export const userResource = "user"
export const publisherResource = "publisher"
export const bookResource = "book"
export const authorResource = "author"
export const borrowingResource = "borrowing"


// ******************
// login form
// ******************

export const loginInputs = [
    { label: 'Email', name: 'email', id: 'email', type: 'email' },
    { label: 'Password', name: 'password', id: 'password', type: 'password' },
]

export const loginSchema = yup.object({
    email: yup.string().email('Please enter a valid email address').required('must enter an email address'),
    password: yup.string().required('must enter a passward'),
}).required();


// ******************
// signup form
// ******************

export const signupInputs = [
    { type: "text", label: "Name", name: "name" },
    { type: "email", label: "Email", name: "email" },
    { type: "password", label: "Password", name: "password" },
    { type: "password", label: "Confirm Password", name: "confirm_password" },
    { type: "text", label: "Address", name: "address" },
    { type: "number", label: "phone", name: "phone" },
]
export const signupSchema = yup.object({
    name: yup.string().required('must enter a first name'),
    email: yup.string().email('Please enter a valid email address').required('must enter an email address'),
    password: yup.string().min(8).required('must enter a passward'),
    confirm_password: yup.string().label('confirm password').required().oneOf([yup.ref('password'), null], 'Passwords must match'),
    address: yup.string().required('must enter an address'),
    phone: yup.number()
}).required();



// ******************
// user
// ******************

export const userHeader = [
    { name: 'name' },
    { name: 'email' },
    { name: 'address' },
    { name: 'phone' },
    { name: 'credit' },
    { name: 'role' },
]



// ******************
// profile
// ******************


export const profileInputs = [
    { name: 'name', label: 'name', type: 'text' },
    { name: 'email', label: 'email', type: 'email' },
    { name: 'address', label: 'address', type: 'text' },
    { name: 'phone', label: 'phone', type: 'text' },
    { name: 'credit', label: 'credit', type: 'number' },
]

const profileSelectOtions = [
    { label: "User", value: "User" },
    { label: "Admin", value: "Admin" }
]

export const profileSelectInputs = [
    { name: "userRole", label: "userRole", type: "select", options: profileSelectOtions, isMulti: false },
]

export const profileSchema = yup.object({
    name: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string(),
    credit: yup.number().required(),
}).required();



// ******************
// publisher
// ******************

export const publisherHeader = [
    { name: 'Name' },
    { name: 'Email' },
    { name: 'Address' },
]

export const publisherInputs = [
    { name: 'name', label: 'name', type: 'text' },
    { name: 'email', label: 'email', type: 'email' },
    { name: 'address', label: 'address', type: 'text' },
]

export const publisherSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
}).required();



// ******************
// book
// ******************

export const bookHeader = [
    { name: "title" },
    { name: "authors" },
    { name: "publishers" },
    { name: "credit" },
    { name: "Total Copies" },
    { name: "Available Copies" }
]

export const bookInputs = ({ authorOptions, publisherOptions }) => [
    { name: "title", label: "title", type: "text" },
    { name: "description", label: "description", type: "text" },
    { name: "authors", label: "authors", type: "select", options: authorOptions, isMulti: true },
    { name: "publishers", label: "publishers", type: "select", options: publisherOptions, isMulti: true },
    { name: "credit", label: "credit", type: "number" },
    { name: "numberOfTotalCopies", label: "numberOfTotalCopies", type: "number" },
    { name: "numberOfAvailableCopies", label: "numberOfAvailableCopies", type: "number" }
]

export const bookSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    // authors: yup.number().required(),
    // publishers: yup.number().required(),
    credit: yup.number().required(),
    numberOfCopiesOwned: yup.number().required(),
    numberOfCopiesExist: yup.number().required(),
}).required();




// ******************
// borrowing
// ******************

export const borrowingHeader = [
    { name: "user" },
    { name: "status" },
    { name: "book title" },
    { name: "book credit" },
    { name: "dueDate" },
    { name: "dateOut" },
    { name: "createdAt" },
]

export const borrowingSelectInputs = ({ usersOptions, bookOptions }) => [
    { name: "userId", label: "user", type: "select", options: usersOptions, isMulti: false },
    { name: "bookIds", label: "books", type: "select", options: bookOptions, isMulti: true },
]

export const borrowingSchema = yup.object({
    // userId: yup.number().required(),
    // bookIds: yup.number().required(),
}).required();



// ******************
// author
// ******************

export const authorHeader = [
    { name: 'Name' },
]

export const authorInputs = [
    { name: 'name', label: 'name', type: 'text' },
]

export const authorSchema = yup.object({
    name: yup.string().required()
}).required();