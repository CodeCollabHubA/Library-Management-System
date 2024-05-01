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
    { name: "bio", label: "bio", type: "textarea" }
]

export const profileSchema = yup.object({
    name: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    bio: yup.string(),
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
    { name: "description" },
    { name: "authors" },
    { name: "publishers" },
    { name: "credit" },
    { name: "numberOfCopiesOwned" },
    { name: "numberOfCopiesExist" }
]

export const bookInputs = ({ authorOptions, publisherOptions }) => [
    { name: "title", label: "title", type: "text" },
    { name: "description", label: "description", type: "text" },
    { name: "authors", label: "authors", type: "select", options: authorOptions, isMulti: true },
    { name: "publishers", label: "publishers", type: "select", options: publisherOptions, isMulti: true },
    { name: "credit", label: "credit", type: "number" },
    { name: "numberOfCopiesOwned", label: "numberOfCopiesOwned", type: "number" },
    { name: "numberOfCopiesExist", label: "numberOfCopiesExist", type: "number" }
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
    { name: "book" },
    { name: "isReturned" },
    { name: "credit" },
    { name: "dueDate" },
    { name: "dateOut" },
]

export const borrowingInputs = ({ usersOptions, bookOptions }) => [
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