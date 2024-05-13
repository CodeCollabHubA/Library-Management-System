
namespace Library.Services.DataServices.Dal.Base
{
    public abstract class BaseDalDataService<TEntity, TDataService>
        where TEntity : BaseEntity, new()
        where TDataService : class

    {
        protected readonly IBaseRepo<TEntity> _mainRepo;
        protected readonly IAppLogging<TDataService> _logger;

        protected BaseDalDataService(IBaseRepo<TEntity> mainRepo, IAppLogging<TDataService> logger)
        {
            _mainRepo = mainRepo;
            _logger = logger;
        }


        public virtual async Task<IEnumerable<TEntity>> GetAllAsync(
            string? filterOn, string? filterQuery,
            string? sortBy, bool isAscending,
            int pageSize, int pageNumber)
            => _mainRepo.GetAllIgnoreQueryFilters(filterOn, filterQuery,
                    sortBy, isAscending,
                    pageSize, pageNumber);

        public virtual async Task<TEntity> FindAsync(int id) => await _mainRepo.FindAsync(id);

        public virtual async Task<TEntity> UpdateAsync(TEntity entity, bool persist = true)
        {
            await _mainRepo.UpdateAsync(entity, persist);
            return entity;
        }

        public virtual async Task DeleteAsync(TEntity entity, bool persist = true)
            => await _mainRepo.DeleteAsync(entity, persist);

        public virtual async Task<TEntity> AddAsync(TEntity entity, bool persist = true)
        {
            await _mainRepo.AddAsync(entity, persist);
            return entity;
        }

        public virtual void ResetChangeTracker()
        {
            _mainRepo.Context.ChangeTracker.Clear();
        }
    }
}
