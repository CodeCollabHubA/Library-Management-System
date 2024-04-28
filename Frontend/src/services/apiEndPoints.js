export const apiUrl = "http://localhost:5053/api"

const apiEndPoints = {
  apiUrl,
  booksApi: `${apiUrl}/Book`,
  publishersApi: `${apiUrl}/Publisher`,
  authorsApi: `${apiUrl}/Author`,
  usersApi: `${apiUrl}/User`,
  borrowingApi: `${apiUrl}/Borrowing`
}


export default apiEndPoints
