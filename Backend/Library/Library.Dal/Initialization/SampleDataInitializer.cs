

using Microsoft.EntityFrameworkCore.Storage;

namespace Library.Dal.Initialization
{
    public static class SampleDataInitializer
    {
        internal static void DropAndCreateDatabase(ApplicationDbContext context)
        {

            context.Database.EnsureDeleted();
            context.Database.Migrate();

        }

        internal static void SeedData(ApplicationDbContext context)
        {

            try {
                ProcessInsert(context, context.Books, SampleData.Books);
                ProcessInsert(context, context.Authors, SampleData.Authors);
                ProcessInsert(context, context.Publishers, SampleData.Publishers);
                ProcessInsert(context, context.Users, SampleData.Users);
                ProcessInsert(context, context.Borrowings, SampleData.Borrowings);
                ProcessInsert(context, context.BookAuthors, SampleData.BookAuthors);
                ProcessInsert(context, context.BookPublishers, SampleData.BookPublishers);

            }
            catch(Exception ex) {
                Console.WriteLine(ex);
                throw;
            
            }




            static void ProcessInsert<TEntity>(
                ApplicationDbContext context, DbSet<TEntity> table, List<TEntity> records) where TEntity : BaseEntity
            {
                // Do nothing if table already has data
                if (table.Any())
                {
                    return;
                }

                // Use the strategy to wrap all calls into single session, to enable identity insert for all queries
                IExecutionStrategy strategy = context.Database.CreateExecutionStrategy();
                strategy.Execute(() =>
                {
                    using var transaction = context.Database.BeginTransaction();

                    try
                    {
                        var metaData = context.Model.FindEntityType(typeof(TEntity).FullName);

                        context.Database.ExecuteSqlRaw(
                        $"SET IDENTITY_INSERT {metaData.GetSchema()}.{metaData.GetTableName()} ON");

                        table.AddRange(records);
                        context.SaveChanges();

                        context.Database.ExecuteSqlRaw(
                        $"SET IDENTITY_INSERT {metaData.GetSchema()}.{metaData.GetTableName()} OFF");

                        transaction.Commit();

                    }
                    catch
                    {
                        transaction.Rollback();
                    }


                });




            }
        }



        public static void InitializeData(ApplicationDbContext context)
        {
            DropAndCreateDatabase(context);
            SeedData(context);
        }
    }
}
