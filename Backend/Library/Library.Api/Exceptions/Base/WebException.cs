namespace Library.Api.Exceptions
{

    public class WebException : ApplicationException
    {
        public string TypeBase = "https://example.com/problems/";
        public string Type { get; protected set; }
        public int Status { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }


        public WebException() : this(string.Empty)
        {
        }


        public WebException(string? message) : this(message, null)
        {
        }

        public WebException(string? message, Exception? innerException) : base(string.IsNullOrWhiteSpace(message)? "An error occurred while processing your request" : message, innerException)
        {
            Type = TypeBase + "internal-server-error";
            Code = "InternalError";
            Status = 500;
            Title = "Internal Server Error";


        }


    }


}

