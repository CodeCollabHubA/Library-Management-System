namespace Library.Api.Exceptions
{

    public class RateLimitExceededException : ApplicationException
    {
        public RateLimitExceededException()
        {
        }

        public RateLimitExceededException(string? message) : base(message)
        {
        }

        public RateLimitExceededException(string? message, Exception? innerException) : base(message, innerException)
        {
        }


    }


}

