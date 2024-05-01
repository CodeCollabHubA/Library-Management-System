namespace Library.Api.Exceptions
{

    public class ValidationException : ApplicationException
    {
        private IDictionary<string, string[]> _errors;

        public ValidationException() { }
        public ValidationException(IDictionary<string, string[]> errors) : this(errors, String.Empty, null)
        {
        }

        public ValidationException(IDictionary<string, string[]> errors, string? message) : this(errors, message, null)
        { 
        }

        public ValidationException(IDictionary<string, string[]> errors, string? message, Exception? innerException) : base(message, innerException)
        {
            _errors = errors;
        }


    }


}

