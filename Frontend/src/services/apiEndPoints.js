export const apiUrl = "http://localhost:5053/api/v1-Beta"

const apiEndPoints = {
  apiUrl,
  bookApi: `${apiUrl}/Book`,
  publisherApi: `${apiUrl}/Publisher`,
  authorApi: `${apiUrl}/Author`,
  userApi: `${apiUrl}/User`,
  borrowingApi: `${apiUrl}/Borrowing`,
  borrowingApiPost: `${apiUrl}/Borrowing/initiate`,
  borrowingApiPut: `${apiUrl}/Borrowing/act-on-borrowing-status`,
}

export default apiEndPoints
