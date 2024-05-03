namespace Library.Api.Exceptions
{

    public class NotFoundException : WebException
    {

        public NotFoundException() : this(string.Empty)
        {
        }
        public NotFoundException(string? message) : this(message, null)
        {
        }

        public NotFoundException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message)? "The resource you requested does not exist":message, innerException)
        {
            Type = TypeBase + "resource-not-found";
            Status = 404;
            Title = "Not Found";
            Code = "ResourceNotFound";
        }


    }


}

