
namespace Library.Api.Swagger;
public class SwaggerDocumentFilter : IDocumentFilter
{
    public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
    {
        foreach (var desc in context.ApiDescriptions)
        {
            if (desc.ParameterDescriptions.Any(p => p.Name == "api-version" && p.Source.Id == "Query"))
                swaggerDoc.Paths.Remove($"/{desc.RelativePath?.TrimEnd('/')}");
        }
    }
}
