

namespace Library.Services.DataServices.Exceptions.Book
{
    public class BookUpdateConflictException : DataServiceException
    {
        public BookUpdateConflictException() : this(string.Empty)
        {
        }

        public BookUpdateConflictException(string? message) : this(message, null)
        {
        }

        public BookUpdateConflictException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "Book update conflict" : message, innerException)
        {

        }


    }
}
