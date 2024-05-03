namespace Library.Api.Filters.Action
{
    public class ValidateImageUploadAttribute : ActionFilterAttribute
    {

    private readonly string _parameterName;

        public ValidateImageUploadAttribute(string parameterName)
        {
            _parameterName = parameterName;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.ActionArguments.TryGetValue(_parameterName, out var entityObj))
            {
                if (entityObj is IImageUploadable entity)
                {
                    if (entity.Image == null)
                    {
                        return;
                    }
                    var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png" };

                    if (entity.Image == null)
                    {
                        context.ModelState.AddModelError("file", "No file uploaded.");
                    }
                    else
                    {
                        if (!allowedExtensions.Contains(Path.GetExtension(entity.Image.FileName)))
                        {
                            context.ModelState.AddModelError("file", "Unsupported file extension.");
                        }

                        if (entity.Image.Length > 10485760)
                        {
                            context.ModelState.AddModelError("file", "File size more than 10MB. Please upload a smaller file.");
                        }
                    }
                }
            }

            
        }

    }
}


