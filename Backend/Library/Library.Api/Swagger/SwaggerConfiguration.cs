
namespace Library.Api.Swagger;

public static class SwaggerConfiguration
{
    public static void AddAndConfigureSwagger(
        this IServiceCollection services,
        IConfiguration config,
        string xmlPathAndFile,
        bool addBearerSecurity)
    {
        services.Configure<SwaggerApplicationSettings>(config.GetSection(nameof(SwaggerApplicationSettings)));

        services.AddSwaggerGen(
            c =>
            {
                c.EnableAnnotations();
                
                c.IncludeXmlComments(xmlPathAndFile);

                if(!addBearerSecurity)
                {
                    return;
                }
                // add the authuntication and authorization code here
            });

    }
}