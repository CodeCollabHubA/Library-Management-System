using Microsoft.AspNetCore.Mvc.ApiExplorer;

namespace Library.Api.Swagger;

public class SwaggerConfigOptions : IConfigureOptions<SwaggerGenOptions>
{
    readonly IApiVersionDescriptionProvider _provider;
    private readonly SwaggerApplicationSettings _settings;

    public SwaggerConfigOptions(
        IApiVersionDescriptionProvider provider, 
        IOptionsMonitor<SwaggerApplicationSettings> settingsMonitor)
    {
        _provider = provider;
        _settings = settingsMonitor.CurrentValue;
    }

    public void Configure(SwaggerGenOptions options)
    {
        foreach (var description in _provider.ApiVersionDescriptions)
        {
            options.SwaggerDoc(description.GroupName, CreateInfoForApiVersion(description, _settings));
        }
    }

    internal static OpenApiInfo CreateInfoForApiVersion(
        ApiVersionDescription description, 
        SwaggerApplicationSettings settings)
    {
        var versionDesc =
            settings.Descriptions.FirstOrDefault(x =>
                x.MajorVersion == (description.ApiVersion.MajorVersion ?? 0)
                && x.MinorVersion == (description.ApiVersion.MinorVersion ?? 0)
                && (string.IsNullOrEmpty(description.ApiVersion.Status) || x.Status==description.ApiVersion.Status));
        var info = new OpenApiInfo()
        {
            Title = settings.Title,
            Version = description.ApiVersion.ToString(),
            Description = $"<p style=\"font-family: Verdana; font-size: 17px; font-style: italic; color: #333;\">{versionDesc?.Description}</p>",
            Contact = new OpenApiContact() { Name = settings.ContactName, Email = settings.ContactEmail, Url = new Uri(settings.ContactUrl) },
            TermsOfService = new System.Uri("https://www.linktotermsofservice.com"),
            License = new OpenApiLicense() { Name = "MIT", Url = new System.Uri("https://opensource.org/licenses/MIT") }
        };
        if (description.IsDeprecated)
        {
            info.Description += "<p><font color='red'>This API version has been deprecated.</font></p>";
        }

        return info;
    }
}