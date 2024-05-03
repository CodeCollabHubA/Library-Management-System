

namespace Library.Services.DataServices.Exceptions.User
{

    public class UserAlreadyExistException : DataServiceException
    {
        public UserAlreadyExistException() : this(string.Empty)
        {
        }

        public UserAlreadyExistException(string? message) : this(message, null)
        {
        }

        public UserAlreadyExistException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "User with this email already exist, please try again with a different email" : message, innerException)
        {

        }


    }
}
