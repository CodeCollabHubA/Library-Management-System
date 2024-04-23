




using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);




// Configure logging with Serilog
builder.ConfigureSerilog();
builder.Services.RegisterLoggingInterfaces();



builder.Services.AddControllers(
    config =>
    {
        config.Filters.Add(new CustomExceptionFilter(builder.Environment));
        config.SuppressAsyncSuffixInActionNames = false;
    })
    .AddJsonOptions(options =>
    {
        // serialize enums as strings in api responses
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

        // prevent cyclic references
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    })
    .ConfigureApiBehaviorOptions(options =>
    {
        //suppress automatic model state binding errors
        options.SuppressModelStateInvalidFilter = true;

        options.SuppressMapClientErrors = false;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link = "https://httpstatuses.com/404";
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Title = "Invalid location";
    });

// Adding the IWebHostEnvironment to the DI container
//builder.Services.AddSingleton<IWebHostEnvironment>(builder.Environment);

// Adding the IHttpContextAccessor to the DI container
builder.Services.AddHttpContextAccessor();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAndConfigureSwagger(
    builder.Configuration,
    Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"),
    true
    );


// The DbContext
var connectionString = builder.Configuration.GetConnectionString("Library");
builder.Services.AddDbContextPool<ApplicationDbContext>(
    options => options.UseSqlServer(connectionString,
    sqlOptions => sqlOptions.EnableRetryOnFailure().CommandTimeout(60))
    );

// AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));


// Data Access Layer Repos
builder.Services.AddRepositories();

// Data Services
builder.Services.AddDataServices();


// Authentication
var jwtOptions = builder.Configuration.GetSection("jwt").Get<JwtOptions>();
builder.Services.AddSingleton(jwtOptions);
builder.Services.AddAuthentication()
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        // save the token, to reach it during the request if wanted
        options.SaveToken = true;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtOptions.Issuer,

            ValidateAudience = true,
            ValidAudience = jwtOptions.Audience,

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SignKey)),


        };
    }
);




// CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
    });
});


var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Initialize the database
    if (app.Configuration.GetValue<bool>("RebuildDataBase"))
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        SampleDataInitializer.InitializeData(dbContext);
    }
}


// Swagger
app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();


//Add CORS Policy
app.UseCors("AllowAll");

// Add static files
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles")),
    RequestPath = "/StaticFiles"
});

// Auth
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers()
    // Require authentication by default
    //.RequireAuthorization()
    ;


app.Run();
