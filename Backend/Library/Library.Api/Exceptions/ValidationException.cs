namespace Library.Api.Exceptions
{

    public class ValidationException : ApplicationException
    {
        public IDictionary<string, string[]> Errors { get; } = new Dictionary<string, string[]>();

        public ValidationException() { }
        public ValidationException(IDictionary<string, string[]> errors) : this(errors, String.Empty, null)
        {
        }

        public ValidationException(IDictionary<string, string[]> errors, string? message) : this(errors, message, null)
        { 
        }

        public ValidationException(IDictionary<string, string[]> errors, string? message, Exception? innerException) : base(message, innerException)
        {
            Errors = errors;
        }


    }


}

