namespace Library.Api.Exceptions
{

    public class ConflictException : WebException
    {
        public ConflictException() : this(string.Empty)
        {
        }

        public ConflictException(string? message) : this(message, null)
        {
        }

        public ConflictException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "Conflict occured" : message, innerException)
        {

            Type = TypeBase + "conflict";
            Status = 409;
            Title = "Conflict";
            Code = "Conflict";
        }


    }


}

