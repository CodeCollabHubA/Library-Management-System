

namespace Library.Dal.Repos.Base
{
    public interface IBaseViewRepo<T>: IDisposable where T : class, new()
    {
        ApplicationDbContext Context { get; }
        IEnumerable<T> ExecuteSqlString(string sqlString);
        IEnumerable<T> GetAll();
        IEnumerable<T> GetAllIgnoreQueryFilters(
            string? filterOn = null, string? filterQuery = null,
            string? sortBy = null, bool isAscending = true,
            int pageSize = 10, int pageNumber = 1
            );
    }
}
