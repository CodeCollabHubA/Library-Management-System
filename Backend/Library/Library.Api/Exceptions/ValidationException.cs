namespace Library.Api.Exceptions
{

    public class ValidationException : WebException
    {
        public IDictionary<string, string[]> Errors { get; }

        public ValidationException() : this(string.Empty)
        { }
        public ValidationException(string? message) : this(message, innerException:null)
        { }
        public ValidationException(IDictionary<string, string[]>? errors) : this(string.Empty, errors)
        { }
        public ValidationException(string? message, Exception? innerException) : this(message, innerException, null)
        { }
        public ValidationException(string? message, IDictionary<string, string[]>? errors) : this(message, null, errors)
        { }

        public ValidationException(string? message, Exception? innerException, IDictionary<string, string[]>? errors) : base(string.IsNullOrWhiteSpace(message) ? "Your inputs are not valid, please check and try again" : message, innerException)
        {
            Errors = errors!;
            Type = TypeBase + "bad-request";
            Status = 400;
            Title = "Bad Request";
            Code = "ValidationError";
        }



    }


}

