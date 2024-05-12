

namespace Library.Services.DataServices.Exceptions.Borrowing
{
    public class BorrowingUserNotFoundException : DataServiceException
    {
        public BorrowingUserNotFoundException() : this(string.Empty)
        {
        }

        public BorrowingUserNotFoundException(string? message) : this(message, null)
        {
        }

        public BorrowingUserNotFoundException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "This user is not found!" : message, innerException)
        {

        }


    }
}
