namespace Library.Api.Exceptions
{

    public class RateLimitExceededException : WebException
    {
        public RateLimitExceededException(): this(string.Empty)
        {
        }

        public RateLimitExceededException(string? message) : this(message, null)
        {
        }

        public RateLimitExceededException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message) ? "Too many requests, please try again later" : message, innerException)
        {
    
            Type = TypeBase + "rate-limit-exceeded";
            Status = 429;
            Title = "Rate Limit Exceeded";
            Code = "ServerRateExceeded";
        }


    }


}

