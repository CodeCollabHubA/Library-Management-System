namespace Library.Api.Exceptions
{

    public class ForbiddenException : ApplicationException
    {
        public ForbiddenException()
        {
        }

        public ForbiddenException(string? message) : base(message)
        {
        }

        public ForbiddenException(string? message, Exception? innerException) : base(message, innerException)
        {
        }


    }


}

