

namespace Library.Services.DataServices.Exceptions.User
{

    public class UserNotFoundException : DataServiceException
    {
        public UserNotFoundException() : this(string.Empty)
        {
        }

        public UserNotFoundException(string? message) : this(message, null)
        {
        }

        public UserNotFoundException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "User not found" : message, innerException)
        {

        }


    }
}
