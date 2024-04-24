namespace Library.Api.Filters.Exception;

public class CustomExceptionFilter : ExceptionFilterAttribute
{
    private readonly IWebHostEnvironment _hostEnviroment;

    public CustomExceptionFilter(IWebHostEnvironment hostEnviroment)
    {
        _hostEnviroment = hostEnviroment;
    }

    public override void OnException(ExceptionContext context)
    {
        var ex = context.Exception;
        string stackTrace = _hostEnviroment.IsDevelopment() ? ex.StackTrace : string.Empty;
        string message = ex.Message;
        string error;
        IActionResult actionResult;
        switch (ex)
        {
            case DatabaseException de:
                error = "Database Issue.";
                actionResult = new ObjectResult(
                    new { Error = error, Message = message, StackTrace = stackTrace })
                {
                    StatusCode = 502
                };
                break;

            case AggregateException ae:
                error = "Aggregate Issue.";
                actionResult = new ObjectResult(
                    new { Error = error, Message = new List<string>() { message }, StackTrace = stackTrace })
                {
                    StatusCode = 500
                };
                break;
            default:
                error = "Server Error.";
                actionResult = new ObjectResult(
                    new { Error = error, Message = message, StackTrace = stackTrace })
                {
                    StatusCode = 500
                };

                break;

        }



        context.Result = actionResult;
    }
}
