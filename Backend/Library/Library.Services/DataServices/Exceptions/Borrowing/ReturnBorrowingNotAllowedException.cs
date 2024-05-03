

namespace Library.Services.DataServices.Exceptions.Borrowing
{
    public class ReturnBorrowingNotAllowedException : DataServiceException
    {
        public ReturnBorrowingNotAllowedException() : this(string.Empty)
        {
        }

        public ReturnBorrowingNotAllowedException(string? message) : this(message, null)
        {
        }

        public ReturnBorrowingNotAllowedException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "Returning this book is not possible" : message, innerException)
        {

        }


    }
}
