namespace Library.Api.Exceptions
{

    public class UnauthorizedException : WebException
    {
        public UnauthorizedException(): this(string.Empty)
        {
        }

        public UnauthorizedException(string? message) : this(message, null)
        {
        }

        public UnauthorizedException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "You are not authenticated!" : message, innerException)
        {

            Type = TypeBase + "unauthorized";
            Status = 401;
            Title = "Unauthorized";
            Code = "Unauthorized";
        }


    }


}

