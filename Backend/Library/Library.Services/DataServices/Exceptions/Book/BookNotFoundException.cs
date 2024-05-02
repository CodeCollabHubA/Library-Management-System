
namespace Library.Services.DataServices.Exceptions.Book
{

    public class BookNotFoundException : DataServiceException
    {
        public BookNotFoundException() : this(string.Empty)
        {
        }

        public BookNotFoundException(string? message) : this(message, null)
        {
        }

        public BookNotFoundException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "Book not found" : message, innerException)
        {

        }


    }
}
