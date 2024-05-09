

namespace Library.Services.DataServices.Exceptions.User
{

    public class UserForbidenExcepiton : DataServiceException
    {
        public UserForbidenExcepiton() : this(string.Empty)
        {
        }

        public UserForbidenExcepiton(string? message) : this(message, null)
        {
        }

        public UserForbidenExcepiton(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "You do not have permission do this action" : message, innerException)
        {

        }


    }
}
