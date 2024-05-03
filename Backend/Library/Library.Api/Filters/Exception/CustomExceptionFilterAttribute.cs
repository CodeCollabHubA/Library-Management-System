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
            Type = "https://example.com/problems/internal-server-error",
            Title = "Internal Server Error",
            Status = 500,
            Extensions =
            {
                ["error"] = new Dictionary<string, string>
                {
                    {"Code", "InternalError" },
                    {"message" , "An error occurred while processing your request" }
                }
            }
        };


        IActionResult result = new ObjectResult(problemDetails)
        {
            StatusCode = 500
        };

        if (context.Exception is customWebExceptions.WebException ex)
        {
            // Filling the problemDetails object
            problemDetails.Type = ex.Type;
            problemDetails.Title = ex.Title;
            problemDetails.Status = ex.Status;



            problemDetails.Extensions["error"] = new Dictionary<string, string>
                {
                    {"Code", ex.Code },
                    {"message" , ex.Message }
                };

            if (ex is customWebExceptions.ValidationException vex)
            {

                problemDetails.Extensions["errors"] = vex.Errors;
            }

            result = new ObjectResult(problemDetails)
            {
                StatusCode = ex.Status
            };
        }


        var traceId = context.HttpContext.TraceIdentifier;
        if (!string.IsNullOrEmpty(traceId))
        {
            problemDetails.Extensions["traceId"] = traceId;
        }



        context.Result = result;


        context.ExceptionHandled = true;
    }




}
