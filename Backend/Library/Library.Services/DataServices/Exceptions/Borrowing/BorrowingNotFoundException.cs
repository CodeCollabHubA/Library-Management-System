

namespace Library.Services.DataServices.Exceptions.Borrowing
{
    public class BorrowingNotFoundException : DataServiceException
    {
        public BorrowingNotFoundException() : this(string.Empty)
        {
        }

        public BorrowingNotFoundException(string? message) : this(message, null)
        {
        }

        public BorrowingNotFoundException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "Borrowing not found" : message, innerException)
        {

        }


    }
}
