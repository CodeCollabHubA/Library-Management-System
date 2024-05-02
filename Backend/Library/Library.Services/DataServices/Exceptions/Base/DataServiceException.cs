namespace Library.Services.DataServices.Exceptions
{

    public class DataServiceException : ApplicationException
    {
        public DataServiceException() : this(string.Empty)
        {
        }

        public DataServiceException(string? message) : this(message, null)
        {
        }

        public DataServiceException(string? message, Exception? innerException) : base(message, innerException)
        {
        }


    }


}

