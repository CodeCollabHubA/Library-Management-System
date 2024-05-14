
using Microsoft.AspNetCore.Authentication.JwtBearer;

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
        services.AddTransient<IConfigureOptions<SwaggerGenOptions>, SwaggerConfigOptions>();
        services.AddSwaggerGen(c =>
        {
            c.EnableAnnotations();
            c.DocumentFilter<SwaggerDocumentFilter>();
            c.IncludeXmlComments(xmlPathAndFile);
            if (!addBearerSecurity)
            {
                return;
            }
            // Enabling authorization using JWT bearer token in the Swagger UI
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n" +
                      "Enter 'Bearer' [space] and then your token in the text input below." +
                      "\r\n\r\nExample: 'Bearer 12345abcdef'",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = JwtBearerDefaults.AuthenticationScheme
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement()
            {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = JwtBearerDefaults.AuthenticationScheme
                        },
                        Scheme = "Oauth2",
                        Name = JwtBearerDefaults.AuthenticationScheme,
                        In = ParameterLocation.Header,
                },
                new List<string>()
                }
            });
        });



    }
}