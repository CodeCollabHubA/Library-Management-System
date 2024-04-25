namespace Library.Api.Filters.ExceptionFilters;

public class CustomExceptionFilter : ExceptionFilterAttribute
{
    private readonly IWebHostEnvironment _hostEnviroment;
    

    public CustomExceptionFilter(IWebHostEnvironment hostEnviroment)
    {
        _hostEnviroment = hostEnviroment;

    }

    public override void OnException(ExceptionContext context)

    {
        var problemDetails = new ProblemDetails
        {
            Status = 500,
            Title = "An error occurred",
            Detail = context.Exception.Message,
            Instance = context.HttpContext.Request.Path
        };


        var traceId = context.HttpContext.TraceIdentifier;
        if (!string.IsNullOrEmpty(traceId))
        {
            problemDetails.Extensions["traceId"] = traceId;
        }

        if (_hostEnviroment.IsDevelopment())
        {
            problemDetails.Extensions["stackTrace"] = context.Exception.StackTrace;

        }

        context.Result = new ObjectResult(problemDetails)
        {
            StatusCode = problemDetails.Status,
        };

        context.ExceptionHandled = true;
    }

   


}
