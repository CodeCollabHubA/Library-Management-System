




namespace Library.Services.DataServices
{
    public static class DataServiceConfiguration
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IBookRepo, BookRepo>();
            services.AddScoped<IAuthorRepo, AuthorRepo>();
            services.AddScoped<IPublisherRepo, PublisherRepo>();
            services.AddScoped<IBorrowingRepo, BorrowingRepo>();
            services.AddScoped<IUserRepo, UserRepo>();
            return services;
        }
        public static IServiceCollection AddDataServices(
        this IServiceCollection services)
        {

            services.AddScoped<IBookDataService, BookDalDataService>();
            services.AddScoped<IUserDataService, UserDalDataService>();
            services.AddScoped<IBorrowingDataService, BorrowingDalDataService>();



            return services;
        }

    }
}
