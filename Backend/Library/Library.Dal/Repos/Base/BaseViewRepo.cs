




namespace Library.Dal.Repos.Base
{
    public abstract class BaseViewRepo<T> : IBaseViewRepo<T> where T : class, new()
    {
        private bool disposedValue;

        public DbSet<T> Table { get; }

        public ApplicationDbContext Context { get; }

        protected BaseViewRepo(ApplicationDbContext context)
        {
            Context = context;
            Table = Context.Set<T>();

        }


        public virtual IEnumerable<T> ExecuteSqlString(string sqlString)
        {
            return Table.FromSqlRaw(sqlString);
        }

        public virtual IEnumerable<T> GetAll()
        {
            return Table.AsQueryable();
        }


        public virtual IEnumerable<T> GetAllIgnoreQueryFilters(
            string? filterOn = null, string? filterQuery = null,
            string? sortBy = null, bool isAscending = true,
            int pageSize = 10, int pageNumber = 1
            )
        {

            var table = Table.IgnoreQueryFilters().AsQueryable();

            // Filtering
            if (!String.IsNullOrWhiteSpace(filterOn) && !String.IsNullOrWhiteSpace(filterQuery))
            {
                // Get the PropertyInfo object for the property to filter on using reflection
                var propertyInfo = typeof(T).GetProperty(filterOn, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (propertyInfo != null)
                {
                    // Construct the predicate dynamically
                    var predicate = LinqHelpers.BuildWherePredicate<T>(propertyInfo, filterQuery);

                    // Apply the predicate to filter the query
                    table = table.Where(predicate);
                }
                else
                {
                    throw new ArgumentException("Invalid filterOn property name");
                }
            }


            // Sorting
            if (!String.IsNullOrWhiteSpace(sortBy))
            {
                var propertyInfo = typeof(T).GetProperty(sortBy, BindingFlags.IgnoreCase | BindingFlags.Public |BindingFlags.Instance);

                if (propertyInfo != null)
                {

                    var function = LinqHelpers.BuildOrderByFunction<T>(propertyInfo);

                    table = isAscending ? table.OrderBy(function) : table.OrderByDescending(function);
                }


            }

            // Pagination
            int toSkip = (pageNumber - 1) * pageSize;
            table = table.Skip(toSkip).Take(pageSize);


            return table.ToList();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    Context.Dispose();
                }

                // No unmanaged resources

                disposedValue = true;
            }
        }

        // No unmanaged resources to dispose during GC
        // ~BaseViewRepo()
        // {
        //     // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
        //     Dispose(disposing: false);
        // }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
