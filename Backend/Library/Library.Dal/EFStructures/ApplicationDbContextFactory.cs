
using Microsoft.EntityFrameworkCore.Design;
namespace Library.Dal.EfStructures
{

    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            var connectionString = @"Server=.,1433;Database=Library;User Id=sa;Password=1234;TrustServerCertificate = true;";
            optionsBuilder.UseSqlServer(connectionString);
            //optionsBuilder.UseSqlServer(connectionString, options => options.EnableRetryOnFailure());
            Console.WriteLine(connectionString);
            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}