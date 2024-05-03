

namespace Library.Services.DataServices.Exceptions.User
{

    public class InvalidUserException : DataServiceException
    {
        public InvalidUserException() : this(string.Empty)
        {
        }

        public InvalidUserException(string? message) : this(message, null)
        {
        }

        public InvalidUserException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "Invalid email or password" : message, innerException)
        {

        }


    }
}
