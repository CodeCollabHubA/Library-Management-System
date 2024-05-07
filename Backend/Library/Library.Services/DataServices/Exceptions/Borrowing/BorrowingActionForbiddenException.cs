
namespace Library.Services.DataServices.Exceptions.Borrowing
{
    public class BorrowingActionForbiddenException : DataServiceException
    {
        public BorrowingActionForbiddenException() : this(string.Empty)
        {
        }

        public BorrowingActionForbiddenException(string? message) : this(message, null)
        {
        }

        public BorrowingActionForbiddenException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "You do not have enough permissions to do this action!" : message, innerException)
        {

        }


    }
}
