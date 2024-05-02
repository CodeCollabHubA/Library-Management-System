
namespace Library.Services.DataServices.Exceptions.Borrowing
{
    public class BorrowingNotAllowedException : DataServiceException
    {
        public BorrowingNotAllowedException() : this(string.Empty)
        {
        }

        public BorrowingNotAllowedException(string? message) : this(message, null)
        {
        }

        public BorrowingNotAllowedException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "Borrowing not allowed" : message, innerException)
        {

        }


    }
}
