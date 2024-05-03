namespace Library.Api.Exceptions
{

    public class ForbiddenException : WebException
    {
        public ForbiddenException(): this (string.Empty)
        {
        }

        public ForbiddenException(string? message) : this(message, null)
        {
        }

        public ForbiddenException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "You do not have enough permissions to perform this action" : message, innerException)
        {
    
            Type = TypeBase + "forbidden";
            Status = 403;
            Title = "Forbidden";
            Code = "UserNotAdmin";
        }


    }


}

