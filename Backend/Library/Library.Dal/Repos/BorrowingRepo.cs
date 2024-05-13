namespace Library.Dal.Repos
{
    public class BorrowingRepo : BaseRepo<Borrowing>, IBorrowingRepo
    {
        public BorrowingRepo(ApplicationDbContext context) : base(context)
        {
        }


        public override IEnumerable<Borrowing> GetAllIgnoreQueryFilters(
            string? filterOn = null, string? filterQuery = null,
            string? sortBy = null, bool isAscending = true,
            int pageSize = 10, int pageNumber = 1
            )
        {
            var table = base.GetAllIgnoreQueryFilters(filterOn, filterQuery, sortBy, isAscending, pageSize, pageNumber);


            // Include book and user
            Table.Where(b => table.Select(x => x.Id).Contains(b.Id))
                    .Include(b => b.BookNavigation)
                     .Include(b => b.BookNavigation.Authors)
                     .Include(b => b.BookNavigation.Publishers)
                    .Include(b => b.UserNavigation)
                    .Include(b => b.ApprovedByNavigation)
                    .Include(b => b.RejectedByNavigation)
                    .Include(b => b.ReturnedByNavigation)
                    .ToList();

            return table;
        }

        public override async Task<Borrowing> FindAsync(int id)
        => await Table
            .Include(b => b.BookNavigation)
                .ThenInclude(book => book.Authors)
            .Include(b => b.BookNavigation)
                .ThenInclude(book => book.Publishers)
            .Include(b => b.UserNavigation)
            .Include(b => b.ApprovedByNavigation)
            .Include(b => b.RejectedByNavigation)
            .Include(b => b.ReturnedByNavigation)
            .FirstOrDefaultAsync(x => x.Id == id);


    }
}
