namespace Library.Api.Filters.Authorization;


[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class CustomAuthorizeAttribute : Attribute, IAuthorizationFilter
{
    private readonly IList<Role> _roles;

    public CustomAuthorizeAttribute(params Role[] roles)
    {
        _roles = roles ?? new Role[] { };

    }


    public void OnAuthorization(AuthorizationFilterContext context)
    {
        // skip if the CustomAllowAnonymous attribute is applied
        var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<CustomAllowAnonymousAttribute>().Any();

        if (allowAnonymous)
        {
            return;

        }

        // authorize
        var user = (UserDTO)context.HttpContext.Items["User"];
        if (user == null || _roles.Any() && !_roles.Contains(user.UserRole))
        {
            context.Result = new JsonResult(new { message = "Unauthorized" })
            {
                StatusCode = StatusCodes.Status401Unauthorized
            };
        }
    }
}