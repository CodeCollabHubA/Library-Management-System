




namespace Library.Dal.Repos
{
    public class BookRepo : BaseRepo<Book>, IBookRepo
    {

        public BookRepo(ApplicationDbContext context) : base(context)
        {
        }



        public virtual IEnumerable<Book> GetAllIgnoreQueryFilters(
            string? filterOn = null, string? filterQuery = null,
            string? sortBy = null, bool isAscending = true,
            int pageSize = 10, int pageNumber = 1
            )
        {

            var table = base.GetAllIgnoreQueryFilters(
                filterOn, filterQuery,
                sortBy, isAscending,
                pageSize, pageNumber
            );

            // include the authors and publishers names
            var bookIds = table.Select(x => x.Id).ToList();
            Table.Where(b => bookIds.Contains(b.Id))
                    .Include(b => b.Authors)
                    .Include(b => b.Publishers).ToList();

            
            return table;
        }



        public override async Task<Book> FindAsync(int id)
           => await Table
                    .Include(b => b.Authors)
                    .Include(b => b.Publishers)
                    .FirstOrDefaultAsync(x => x.Id == id);
    }
}
