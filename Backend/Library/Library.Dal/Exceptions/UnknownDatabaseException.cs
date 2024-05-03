

namespace Library.Dal.Exceptions
{
    public class UnknownDatabaseException : ApplicationException
    {
        public UnknownDatabaseException()
        {
        }

        public UnknownDatabaseException(string? message) : base(message)
        {
        }

        public UnknownDatabaseException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

       
    }
}
